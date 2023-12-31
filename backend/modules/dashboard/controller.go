package dashboard

import (
	"awesome/utils"

	"github.com/gofiber/fiber/v2"
)

var AllSchemaMaps utils.SchemaMap

const MAX_LAST_ENTRIES = 20

func GetAllSchema(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(AllSchemaMaps)
}
