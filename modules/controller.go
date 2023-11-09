package modules

import (
	"encoding/json"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetAppConfigs(modules []Module) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		type ModuleConfig struct {
			Name      string     `json:"name"`
			Resources []Resource `json:"resources"`
		}

		var allModules []ModuleConfig
		for _, module := range modules {
			allModules = append(allModules, ModuleConfig{
				Name:      module.Name,
				Resources: module.Resources,
			})
		}

		jsonConfig, err := json.Marshal(allModules)
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error in getting config",
			})
		}

		return ctx.Status(http.StatusOK).JSON(string(jsonConfig))
	}
}
