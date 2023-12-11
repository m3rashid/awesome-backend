package ws

import (
	"log"
	"sync"

	"github.com/gofiber/websocket/v2"
)

type client struct {
	isClosing bool
	mu        sync.Mutex
}

// TODO: upgrade this to use redis
/*
 * Note: although large maps with pointer-like types (e.g. strings) as keys are slow,
 * using pointers themselves as keys is acceptable and fast
 */
var Clients = make(map[*websocket.Conn]*client)
var Register = make(chan *websocket.Conn)
var Broadcast = make(chan string)
var Unregister = make(chan *websocket.Conn)

func RunHub() {
	for {
		select {
		case connection := <-Register:
			Clients[connection] = &client{}
			log.Println("connection registered")

		case message := <-Broadcast:
			log.Println("message received:", message)
			// Send the message to all clients
			for connection, c := range Clients {
				// send to each client in parallel so we don't block on a slow client
				go func(connection *websocket.Conn, c *client) {
					c.mu.Lock()
					defer c.mu.Unlock()
					if c.isClosing {
						return
					}
					if err := connection.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
						c.isClosing = true
						log.Println("write error:", err)

						connection.WriteMessage(websocket.CloseMessage, []byte{})
						connection.Close()
						Unregister <- connection
					}
				}(connection, c)
			}

		case connection := <-Unregister:
			// Remove the client from the hub
			delete(Clients, connection)
			log.Println("connection unregistered")
		}
	}
}
