package modules

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/m3rashid/awesome/modules/helpers"
	"github.com/m3rashid/awesome/modules/permissions"
)

func RegisterRoutes(app *fiber.App, modules []Module) {
	app.Get("/", func(ctx *fiber.Ctx) error {
		// sample casbin usage
		casbin := ctx.Locals("casbin").(*permissions.Casbin)
		ok, err := casbin.Enforcer.Enforce("3", "/", "view")
		if err != nil {
			fmt.Println("casbin error", err)
			return ctx.Status(500).SendString(err.Error())
		}
		if !ok {
			return ctx.Status(403).SendString("You are not allowed to view this page")
		}
		return ctx.SendString("Hello, World!")
	})

	app.Get("/metrics", monitor.New(monitor.Config{
		Title: os.Getenv("APP_NAME") + " - Metrics",
	}))

	app.Get("/configs", GetAppConfig(modules))

	for _, module := range modules {
		for route, handler := range module.ProtectedRoutes {
			app.Post("/api/"+module.Name+route, helpers.CheckAuth(), handler.Controller)
		}

		for route, handler := range module.AnonymousRoutes {
			app.Post("/api/anonymous/"+module.Name+route, handler.Controller)
		}
	}
}
