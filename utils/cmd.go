package utils

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/modules"
)

func HandleCmdArgs(app *fiber.App, allModules []modules.Module) (shutDown bool) {
	cmdArguments := os.Args[1:]
	if len(cmdArguments) == 0 {
		return false
	}

	isSeed := Includes[string](cmdArguments, "seed")
	isMigrate := Includes[string](cmdArguments, "migrate")

	var allModels []interface{}
	for _, module := range allModules {
		allModels = append(allModels, module.Models...)
	}

	if isMigrate {
		db.GormMigrate(allModels...)
	}

	if isSeed {
		db.Seed(allModels...)
	}

	return true
}
