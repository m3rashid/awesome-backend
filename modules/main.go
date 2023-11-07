package modules

import (
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/m3rashid/awesome/utils"
)

func RegisterRoutes(app *fiber.App, modules []Module) {
	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("Hello, World!")
	})

	app.Get("/metrics", monitor.New(monitor.Config{
		Title: os.Getenv("APP_NAME") + " - Metrics",
	}))

	app.Get("/configs", func(ctx *fiber.Ctx) error {
		var configs []string
		for _, module := range modules {
			json, err := module.Stringify()
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"error": "Error in getting config",
				})
			}
			configs = append(configs, json)
		}
		return ctx.Status(http.StatusOK).JSON(configs)
	})

	for _, module := range modules {
		for route, handler := range module.AuthenticatedRoutes {
			app.Post("/api/"+module.Name+route, utils.CheckAuth(), handler)
		}

		for route, handler := range module.AnonymousRoutes {
			app.Post("/api/anonymous/"+module.Name+route, handler)
		}
	}
}
