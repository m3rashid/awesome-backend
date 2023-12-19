package controller

import (
	"net/http"

	"awesome/db"

	"github.com/gofiber/fiber/v2"
)

func Get[T interface{}]() func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var requestBody GetBody[T]
		err := ctx.BodyParser(&requestBody)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		var column T
		db := db.GetDb()
		if requestBody.Populate != nil {
			for _, populate := range requestBody.Populate {
				db = db.Preload(populate)
			}
		}

		err = db.Where(requestBody.SearchCriteria).First(&column).Error
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}
		return ctx.Status(http.StatusOK).JSON(column)
	}
}
