package module

import (
	"awesome/models"

	"github.com/gofiber/fiber/v2"
)

func GetModels() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		models := []map[string]string{
			models.ActionLogTableSchemaMap,
			models.DriveFileTableSchemaMap,
			models.EmailTableSchemaMap,
			models.ProfileTableSchemaMap,
			models.UserTableSchemaMap,
		}

		return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"models": models})
	}
}

func GetIndex() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		// sample casbin usage
		// casbin := ctx.Locals("casbin").(*permissions.Casbin)
		// ok, err := casbin.Enforcer.Enforce("3", "/", "view")
		// if err != nil {
		// 	fmt.Println("casbin error", err)
		// 	return ctx.Status(500).SendString(err.Error())
		// }
		// if !ok {
		// 	return ctx.Status(403).SendString("You are not allowed to view this page")
		// }
		return ctx.SendString("Hello, World!")
	}
}
