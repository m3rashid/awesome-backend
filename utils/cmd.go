package utils

import (
	"fmt"
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

	isSeed := Includes[string](cmdArguments, "seed")
	isMigrate := Includes[string](cmdArguments, "migrate")

	allModels := []interface{}{}
	for _, module := range allModules {
		allModels = append(allModels, module.Models...)
	}

	if isMigrate {
		db.GormMigrate(allModels...)
	}

	if isSeed {
		db.Seed(allModels...)
		err := casbin.SeedDefaultPermissions()
		if err != nil {
			fmt.Println("error in seeding default permissions")
			panic(err)
		}
	}

	return true
}
