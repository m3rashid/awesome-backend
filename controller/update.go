package controller

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
)

func Update[T interface{}](tableName string, options map[string]interface{}) func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var updateBody UpdateBody
		err := ctx.BodyParser(&updateBody)
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{"error": err.Error()})
		}

		update := updateBody.Update
		searchCriteria := updateBody.SearchCriteria

		if searchCriteria == nil {
			return ctx.Status(400).JSON(fiber.Map{"error": "search criteria is required"})
		}

		if options[SKIP_VALIDATION_KEY] == false {
			validate := validator.New()
			err = validate.Struct(update)
			if err != nil {
				return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
			}
		}

		db := db.GetDb()
		err = db.Table(tableName).Where(searchCriteria).Updates(update).Error
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		return ctx.Status(http.StatusOK).JSON(fiber.Map{"message": "Document updated successfully"})
	}
}
