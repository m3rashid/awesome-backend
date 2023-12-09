package controller

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
)

func Create[T interface{}]() func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var data T
		err := ctx.BodyParser(&data)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		validate := validator.New()
		err = validate.Struct(data)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		db := db.GetDb()
		err = db.Create(&data).Error
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		return ctx.Status(http.StatusCreated).JSON(fiber.Map{"message": "Created Successfully"})
	}
}
