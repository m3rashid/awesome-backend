package modules

import (
	"fmt"
	"net/http/httptest"
	"os"
	"strings"

	"encoding/json"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/m3rashid/awesome/modules/helpers"
)

func RegisterRoutes(app *fiber.App, modules []Module) {
	app.Get("/", func(ctx *fiber.Ctx) error {
		// sample casbin usage
		casbin := ctx.Locals("casbin").(*helpers.Casbin)
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

func SetupTests(app *fiber.App, modules []Module) {
	type AllTests = map[string][]TestRoute
	allTests := make(AllTests)

	for _, module := range modules {
		for route, handler := range module.ProtectedRoutes {
			allTests["/api/"+module.Name+route] = handler.Tests
		}

		for route, handler := range module.AnonymousRoutes {
			allTests["/api/anonymous/"+module.Name+route] = handler.Tests
		}
	}

	fmt.Println(allTests)

	for route, tests := range allTests {
		for _, test := range tests {
			jsonBytes, err := json.Marshal(test.RequestBody)
			if err != nil {
				panic(fmt.Sprintf("ERROR in marshalling to JSON %s", err))
			}

			req := httptest.NewRequest(test.Method, route, strings.NewReader(string(jsonBytes)))
			res, err := app.Test(req, 5, 10)
			if err != nil {
				panic(err)
			}

			fmt.Println(res)
			if res.StatusCode != test.ExpectedStatusCode {
				panic("Status code does not match, test failed")
			}
		}
	}

	fmt.Println("\n\nAll tests passed")
	fmt.Println("All modules are working fine")
}
