package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"go.mongodb.org/mongo-driver/mongo"
)

func Get[T interface{}, SearchCriteria interface{}](collectionName string, options map[string]interface{}) func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var searchCriteria SearchCriteria
		err := ctx.BodyParser(&searchCriteria)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		collection := db.GetCollection(collectionName)
		var document T
		err = collection.FindOne(ctx.Context(), searchCriteria).Decode(&document)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return ctx.Status(http.StatusNotFound).JSON(fiber.Map{"error": "document not found"})
			} else {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}
		}

		return ctx.Status(http.StatusOK).JSON(document)
	}
}
