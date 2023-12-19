package ws

import (
	"encoding/json"
	"log"

	"awesome/utils"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func SetupWebsockets(app *fiber.App) {
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws/:id", websocket.New(func(wsConnection *websocket.Conn) {
		log.Println("IP ADDRESS: ", wsConnection.IP())
		Register <- wsConnection
		defer func() {
			Unregister <- wsConnection
			wsConnection.Close()
		}()

		var (
			messageType int
			err         error
			message     []byte
		)

		for {
			if messageType, message, err = wsConnection.ReadMessage(); err != nil {
				log.Println("ws message read error:", err)
				break
			}

			if messageType == websocket.TextMessage {
				var wsMessage MessageFormat
				err := json.Unmarshal([]byte(message), &wsMessage)
				if err != nil || wsMessage.Token == "" || wsMessage.ActionType == "" {
					SendServerMessage(wsConnection, "Wrong message format", NoAction)
					continue
				}

				validate := validator.New()
				err = validate.Struct(wsMessage)
				if err != nil {
					SendServerMessage(wsConnection, "Wrong message format", NoAction)
					continue
				}

				claims, err := utils.CheckAuth(wsMessage.Token)
				if err != nil || claims == nil {
					SendServerMessage(wsConnection, "invalid token", Logout)
					continue
				}

				wsMessage.ClientConnection = wsConnection
				Broadcast <- wsMessage
			} else {
				log.Println("websocket message received of type", messageType)
			}
		}
	}, websocket.Config{
		RecoverHandler: func(conn *websocket.Conn) {
			if err := recover(); err != nil {
				conn.WriteJSON(fiber.Map{"customError": "error occurred"})
			}
		},
	}))
}
