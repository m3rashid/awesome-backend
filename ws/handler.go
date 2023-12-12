package ws

// import (
// 	"encoding/json"
// 	"log"

// 	"github.com/go-playground/validator/v10"
// 	"github.com/gofiber/websocket/v2"
// 	"github.com/m3rashid/awesome/utils"
// )

// func WebsocketHandler(wsConnection *websocket.Conn) {
// 	Register <- wsConnection
// 	defer func() {
// 		Unregister <- wsConnection
// 		wsConnection.Close()
// 	}()

// 	for {
// 		messageType, message, err := wsConnection.ReadMessage()
// 		if err != nil {
// 			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
// 				log.Println("read error:", err)
// 			}
// 			return
// 		}

// 		if messageType == websocket.TextMessage {
// 			var wsMessage MessageFormat
// 			err := json.Unmarshal([]byte(message), &wsMessage)
// 			if err != nil || wsMessage.Token == "" || wsMessage.ActionType == "" {
// 				SendServerMessage(wsConnection, "Wrong message format", NoAction)
// 				continue
// 			}

// 			validate := validator.New()
// 			err = validate.Struct(wsMessage)
// 			if err != nil {
// 				SendServerMessage(wsConnection, "Wrong message format", NoAction)
// 				continue
// 			}

// 			claims, err := utils.CheckAuth(wsMessage.Token)
// 			if err != nil || claims == nil {
// 				SendServerMessage(wsConnection, "invalid token", Logout)
// 				continue
// 			}

// 			wsMessage.ClientConnection = wsConnection
// 			Broadcast <- wsMessage
// 		} else {
// 			log.Println("websocket message received of type", messageType)
// 		}
// 	}
// }
