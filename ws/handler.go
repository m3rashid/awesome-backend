package ws

import (
	"log"

	"github.com/gofiber/websocket/v2"
)

func WebsocketHandler(c *websocket.Conn) {
	// When the function returns, unregister the client and close the connection
	defer func() {
		Unregister <- c
		c.Close()
	}()

	// Register the client
	Register <- c

	for {
		messageType, message, err := c.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("read error:", err)
			}

			return // Calls the deferred function, i.e. closes the connection on error
		}

		if messageType == websocket.TextMessage {
			// Broadcast the received message
			Broadcast <- string(message)
		} else {
			log.Println("websocket message received of type", messageType)
		}
	}
}
