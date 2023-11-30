package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
)

func Get[T interface{}]() func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var requestBody T
		err := ctx.BodyParser(&requestBody)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		var column T
		db := db.GetDb()
		err = db.Where(requestBody).First(&column).Error
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}
		return ctx.Status(http.StatusOK).JSON(column)
	}
}
