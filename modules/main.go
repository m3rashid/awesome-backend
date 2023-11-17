package modules

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/utils"
)

func RegisterRoutes(app *fiber.App, modules []Module) {
	for _, module := range modules {
		db.GormMigrate(module.Models...)
	}

	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("Hello, World!")
	})

	app.Get("/metrics", monitor.New(monitor.Config{
		Title: os.Getenv("APP_NAME") + " - Metrics",
	}))

	app.Get("/configs", GetAppConfig(modules))

	for _, module := range modules {
		for route, handler := range module.ProtectedRoutes {
			app.Post("/api/"+module.Name+route, utils.CheckAuth(), handler)
		}

		for route, handler := range module.AnonymousRoutes {
			app.Post("/api/anonymous/"+module.Name+route, handler)
		}
	}
}
