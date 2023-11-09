package controller

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"go.mongodb.org/mongo-driver/mongo"
)

func Update[T interface{}](collectionName string, options map[string]interface{}) func(*fiber.Ctx) error {
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

		collection := db.GetCollection(collectionName)
		err = collection.FindOneAndUpdate(ctx.Context(), searchCriteria, update).Err()
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return ctx.Status(http.StatusNotFound).JSON(fiber.Map{"error": "document not found"})
			} else {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}
		}

		return ctx.Status(http.StatusOK).JSON(fiber.Map{"message": "Document updated successfully"})
	}
}
