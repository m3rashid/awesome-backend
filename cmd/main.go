package cmd

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/module"
	"github.com/m3rashid/awesome/modules/permissions"
	"github.com/m3rashid/awesome/utils"
)

func HandleCmdArgs(app *fiber.App, allModules []module.Module, casbin *permissions.Casbin) bool {
	cmdArguments := os.Args[1:]
	if len(cmdArguments) == 0 {
		return false
	}

	isMigrate := utils.Includes[string](cmdArguments, "migrate")

	allModels := []interface{}{}
	for _, module := range allModules {
		allModels = append(allModels, module.Models...)
	}

	if isMigrate {
		db.GormMigrate(allModels...)
	}

	return true
}
