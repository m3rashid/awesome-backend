package ws

// import (
// 	"github.com/gofiber/fiber/v2"
// 	"github.com/gofiber/websocket/v2"
// )

// func UpgraderMiddleware(c *fiber.Ctx) error {
// 	if websocket.IsWebSocketUpgrade(c) {
// 		// Returns true if the client requested upgrade to the WebSocket protocol
// 		return c.Next()
// 	}
// 	return c.SendStatus(fiber.StatusUpgradeRequired)
// }
