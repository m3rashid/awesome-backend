package ws

// import (
// 	"fmt"
// 	"log"
// 	"sync"

// 	"github.com/gofiber/websocket/v2"
// )

// type client struct {
// 	isClosing bool
// 	mu        sync.Mutex
// }

// type ExperimentalClient struct {
// 	isClosing bool
// 	mu        sync.Mutex
// 	conn      *websocket.Conn
// }

// // TODO: upgrade this to use redis
// var Broadcast = make(chan MessageFormat)
// var Register = make(chan *websocket.Conn)
// var Unregister = make(chan *websocket.Conn)
// var Clients = make(map[*websocket.Conn]*client)
// var ExperimentalClients = make(map[string]ExperimentalClient)

// func RunHub() {
// 	for {
// 		select {
// 		case wsMessage := <-Broadcast:
// 			fmt.Println("message received", wsMessage.ActionType, wsMessage.Data)

// 			for connection, c := range Clients {
// 				go func(connection *websocket.Conn, c *client) {
// 					c.mu.Lock()
// 					defer c.mu.Unlock()
// 					if c.isClosing {
// 						return
// 					}
// 					// 		if err := connection.WriteMessage(websocket.TextMessage, []byte(wsMessage)); err != nil {
// 					// 			c.isClosing = true
// 					// 			log.Println("write error:", err)

// 					// 			connection.WriteMessage(websocket.CloseMessage, []byte{})
// 					// 			connection.Close()
// 					// 			Unregister <- connection
// 					// 		}
// 				}(connection, c)
// 			}

// 		case connection := <-Register:
// 			Clients[connection] = &client{}
// 			fmt.Println("remote address")
// 			log.Println("connection registered")

// 		case connection := <-Unregister:
// 			delete(Clients, connection)
// 			log.Println("connection unregistered")

// 		}
// 	}
// }
