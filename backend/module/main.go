package module

import (
	"awesome/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
)

func RegisterRoutes(app *fiber.App, modules []Module) {
	app.Get("/", GetIndex())
	app.Post("/models", GetModels())

	app.Get("/metrics", monitor.New(monitor.Config{
		APIOnly: true,
	}))

	for _, module := range modules {
		for route, handler := range module.ProtectedRoutes {
			if handler.HttpMethod == "" {
				handler.HttpMethod = "POST"
			}
			app.Add(handler.HttpMethod, "/api/"+module.Name+route, utils.CheckAuthMiddleware(), handler.Controller)
		}

		for route, handler := range module.AnonymousRoutes {
			if handler.HttpMethod == "" {
				handler.HttpMethod = "POST"
			}
			app.Add(handler.HttpMethod, "/api/anonymous/"+module.Name+route, handler.Controller)
		}
	}
}
