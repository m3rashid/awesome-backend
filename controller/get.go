package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
)

func Get[T interface{}, SearchCriteria interface{}]() func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var searchCriteria SearchCriteria
		err := ctx.BodyParser(&searchCriteria)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		var document T
		db := db.GetDb()
		result := db.First(&document, searchCriteria)

		return ctx.Status(http.StatusOK).JSON(result)
	}
}
