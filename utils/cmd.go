package utils

import (
	"fmt"
	"os"
	"os/exec"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/modules"
)

func HandleCmdArgs(app *fiber.App, allModules []modules.Module) (shutDown bool) {
	cmdArguments := os.Args[1:]
	if len(cmdArguments) == 0 {
		return false
	}

	isTest := Includes[string](cmdArguments, "test")
	isSeed := Includes[string](cmdArguments, "seed")
	isMigrate := Includes[string](cmdArguments, "migrate")

	testDbName := os.Getenv("TEST_DB_NAME")

	if isTest {
		err := exec.Command("dropdb", testDbName).Run()
		if err != nil {
			fmt.Println("Error dropping test database")
		}

		err = exec.Command("createdb", testDbName).Run()
		if err != nil {
			fmt.Println("Error creating test database")
		}

		os.Setenv("SERVER_MODE", "test")
	}

	var allModels []interface{}
	for _, module := range allModules {
		allModels = append(allModels, module.Models...)
	}

	if isMigrate {
		db.GormMigrate(allModels...)
	}

	if isSeed && !isTest {
		db.Seed(allModels...)
	}

	if isTest {
		db.Seed(allModels...)
		modules.SetupTests(app, allModules)
	}

	return true
}
