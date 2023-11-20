package utils

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/modules"
	"github.com/m3rashid/awesome/modules/permissions"
)

func HandleCmdArgs(app *fiber.App, allModules []modules.Module, casbin *permissions.Casbin) bool {
	cmdArguments := os.Args[1:]
	if len(cmdArguments) == 0 {
		return false
	}

	isMigrate := Includes[string](cmdArguments, "migrate")

	allModels := []interface{}{}
	for _, module := range allModules {
		allModels = append(allModels, module.Models...)
	}

	if isMigrate {
		db.GormMigrate(allModels...)
	}

	return true
}
