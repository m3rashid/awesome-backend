package controller

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
)

func Create[T interface{}](collectionName string, options map[string]interface{}) func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var document T
		err := ctx.BodyParser(&document)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		if options[SKIP_VALIDATION_KEY] == false {
			validate := validator.New()
			err = validate.Struct(document)
			if err != nil {
				return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
			}
		}

		mongoClient := db.DBinstance()
		collection := db.OpenCollection(mongoClient, collectionName)

		result, err := collection.InsertOne(context.Background(), document)
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		fmt.Println(result)
		return ctx.Status(http.StatusCreated).JSON(fiber.Map{"id": result.InsertedID})
	}
}
