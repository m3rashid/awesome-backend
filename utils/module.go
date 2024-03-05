package utils

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
)

func RegisterRoutes(app *fiber.App, modules []Module) {
	app.Get("/", func(c *fiber.Ctx) error {
		// sample casbin usage
		// casbin := ctx.Locals("casbin").(*permissions.Casbin)
		// ok, err := casbin.Enforcer.Enforce("3", "/", "view")
		// if err != nil {
		// 	fmt.Println("casbin error", err)
		// 	return ctx.Status(500).SendString(err.Error())
		// }
		// if !ok {
		// 	return ctx.Status(403).SendString("You are not allowed to view this page")
		// }
		return c.SendString("Hello, World!")
	})

	app.Get("/metrics", monitor.New(monitor.Config{
		APIOnly: true,
	}))

	for _, module := range modules {
		for route, handler := range module.ProtectedRoutes {
			if handler.HttpMethod == "" {
				handler.HttpMethod = "POST"
			}
			app.Add(handler.HttpMethod, "/api/"+module.Name+route, CheckAuthMiddleware(), handler.Controller)
		}

		for route, handler := range module.AnonymousRoutes {
			if handler.HttpMethod == "" {
				handler.HttpMethod = "POST"
			}
			app.Add(handler.HttpMethod, "/api/anonymous/"+module.Name+route, handler.Controller)
		}
	}
}
