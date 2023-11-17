package modules

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/thoas/go-funk"
)

func GetAppConfigs(modules []Module) fiber.Handler {
	GetRoutes := func(module Module, routeType string, noReturn bool) []string {
		if noReturn {
			return []string{}
		}

		if routeType == "protected" {
			return funk.Map(module.ProtectedRoutes, func(route string, _ fiber.Handler) string {
				return "/api/" + module.Name + route
			}).([]string)
		} else if routeType == "anonymous" {
			return funk.Map(module.AnonymousRoutes, func(route string, _ fiber.Handler) string {
				return "/api/anonymous/" + module.Name + route
			}).([]string)
		}
		return []string{}
	}

	return func(ctx *fiber.Ctx) error {
		type ModuleConfig struct {
			Name            string     `json:"name"`
			Resources       []Resource `json:"resources"`
			ProtectedRoutes []string   `json:"protectedRoutes,omitempty"`
			AnonymousRoutes []string   `json:"anonymousRoutes,omitempty"`
		}

		var allModules []ModuleConfig
		for _, module := range modules {
			allModules = append(allModules, ModuleConfig{
				Name:            module.Name,
				Resources:       module.Resources,
				ProtectedRoutes: GetRoutes(module, "protected", !(ctx.Query("protected_routes") == "true")),
				AnonymousRoutes: GetRoutes(module, "anonymous", !(ctx.Query("anon_routes") == "true")),
			})
		}

		return ctx.Status(http.StatusOK).JSON(allModules)
	}
}
