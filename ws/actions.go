package ws

import (
	"encoding/json"
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/contrib/websocket"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/models"
)

func CommunityChatMessageHandler(wsMessage MessageFormat) {
	jsonStr, err := json.Marshal(wsMessage.Data)
	if err != nil {
		log.Println("Erorr in parsing data", err)
		return
	}

	communityChatMsg := models.CommunityChatMessage{}
	err = json.Unmarshal(jsonStr, &communityChatMsg)
	if err != nil {
		SendServerMessage(wsMessage.ClientConnection, "Wrong message format", NoAction)
		return
	}

	validate := validator.New()
	err = validate.Struct(communityChatMsg)
	if err != nil {
		SendServerMessage(wsMessage.ClientConnection, "Wrong message format", NoAction)
		return
	}

	db := db.GetDb()
	err = db.Preload("Sender").Create(&communityChatMsg).Error
	if err != nil {
		log.Println("Error in saving message", err)
		return
	}

	err = db.Where("id = ?", communityChatMsg.ID).Preload("Sender").First(&communityChatMsg).Error
	if err != nil {
		log.Println("Error in getting message", err)
		return
	}

	jsonStr, err = json.Marshal(communityChatMsg)
	if err != nil {
		log.Println("Erorr in parsing data", err)
		return
	}

	log.Println("message saved to the database successfully", jsonStr)

	for connection, c := range Clients {
		go func(connection *websocket.Conn, c *client) {
			// c.mu.Lock()
			// defer c.mu.Unlock()
			// if c.isClosing {
			// 	return
			// }
			SendServerMessage(wsMessage.ClientConnection, string(jsonStr), ServerActionType(CommunityChatMessage))
		}(connection, c)
	}
}