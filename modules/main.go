package modules

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/m3rashid/awesome/modules/permission"
	"github.com/m3rashid/awesome/utils"
)

type Controller = map[string]fiber.Handler

type Module struct {
	Name                string                        `json:"name"`
	Permissions         []permission.ModulePermission `json:"permissions"`
	AnonymousRoutes     Controller
	AuthenticatedRoutes Controller
}

func RegisterRoutes(app *fiber.App, modules []Module) {

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Get("/metrics", monitor.New(monitor.Config{
		Title: os.Getenv("APP_NAME") + " - Metrics",
	}))

	for _, module := range modules {
		for route, handler := range module.AuthenticatedRoutes {
			app.Post("/api/"+module.Name+route, utils.CheckAuth(), handler)
		}

		for route, handler := range module.AnonymousRoutes {
			app.Post("/api/anonymous/"+module.Name+route, handler)
		}
	}
}
