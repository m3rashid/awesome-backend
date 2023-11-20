package modules

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetAppConfig(modules []Module) fiber.Handler {
	type Routes map[string]string

	GetRoutes := func(module Module, query string, noReturn bool) Routes {
		if noReturn {
			return map[string]string{}
		}

		routes := make(map[string]string)
		if query == "protected" {
			for route, routeConfig := range module.ProtectedRoutes {
				routes["/api/"+module.Name+route] = routeConfig.Description
			}
		} else if query == "anonymous" {
			for route, routeConfig := range module.AnonymousRoutes {
				routes["/api/anonymous/"+module.Name+route] = routeConfig.Description
			}
		}

		return routes
	}

	return func(ctx *fiber.Ctx) error {

		type ModuleConfig struct {
			Name            string    `json:"name"`
			Resources       Resources `json:"resources"`
			ProtectedRoutes Routes    `json:"protectedRoutes,omitempty"`
			AnonymousRoutes Routes    `json:"anonymousRoutes,omitempty"`
		}

		var allModules []ModuleConfig
		for _, module := range modules {
			allModules = append(allModules, ModuleConfig{
				Name:            module.Name,
				Resources:       module.Resources,
				ProtectedRoutes: GetRoutes(module, "protected", !(ctx.Query("protected_routes") == "true")),
				AnonymousRoutes: GetRoutes(module, "anonymous", !(ctx.Query("anonymous_routes") == "true")),
			})
		}

		return ctx.Status(http.StatusOK).JSON(allModules)
	}
}
