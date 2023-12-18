package controller

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/models"
)

func Create[T interface{}](tableName string, options WorkflowOptions[T]) func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var data CreateRequestBody[T]
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
		err = db.Create(&data.Body).Error
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		models.Flows <- models.WorkflowAction{
			TableName: tableName,
			Action:    models.CreateAction,
		}

		if data.ResourceIndex.Name != "" && data.ResourceIndex.ResourceType != "" {
			jsonByte, err := json.Marshal(data.Body)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}

			var createdResponse CreatedDBResponse
			err = json.Unmarshal(jsonByte, &createdResponse)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}

			newResource := models.Resource{
				Name:         data.ResourceIndex.Name,
				Description:  data.ResourceIndex.Description,
				ResourceID:   createdResponse.ID,
				ResourceType: data.ResourceIndex.ResourceType,
			}

			err = db.Create(&newResource).Error
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}
		}

		return ctx.Status(http.StatusCreated).JSON(fiber.Map{"message": "Created Successfully"})
	}
}
