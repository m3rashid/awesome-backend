package module

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetAppConfig(modules []Module) fiber.Handler {
	type Routes [][]string

	GetRoutes := func(module Module, query string, noReturn bool) Routes {
		routes := [][]string{}
		if noReturn {
			return routes
		}

		if query == "protected" {
			for route, routeConfig := range module.ProtectedRoutes {
				if routeConfig.HttpMethod == "" {
					routeConfig.HttpMethod = "POST"
				}
				routes = append(routes, []string{
					routeConfig.HttpMethod,
					"/api/" + module.Name + route,
					routeConfig.Description,
				})
			}

			routes = append(routes, [][]string{
				{"DELETE", "/api/files/stop", "stop the upload"},
				{"GET", "/api/files/download", "download file"},
				{"HEAD", "/api/files/head", "get the head of the file"},
				{"PATCH", "/api/files/patch", "patch file"},
				{"POST", "/api/files/upload", "upload file"},
				{"POST", "/api/files/upload-v2", "upload file with v2"},
			}...)

		} else if query == "anonymous" {
			for route, routeConfig := range module.AnonymousRoutes {
				if routeConfig.HttpMethod == "" {
					routeConfig.HttpMethod = "POST"
				}
				routes = append(routes, []string{
					routeConfig.HttpMethod,
					"/api/anonymous/" + module.Name + route,
					routeConfig.Description,
				})
			}

			routes = append(routes, [][]string{
				{"GET", "/", "get the root"},
				{"GET", "/configs", "get the configs, use params protected_routes=true to get protected routes also and anonymous_routes=true to get anonymous routes"},
				{"GET", "/metrics", "get the metrics"},
			}...)
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
