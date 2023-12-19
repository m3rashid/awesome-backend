package controller

import (
	"encoding/json"
	"net/http"

	"awesome/db"
	"awesome/models"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func Update[T interface{}](tableName string) func(*fiber.Ctx) error {
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

		validate := validator.New()
		err = validate.Struct(update)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
		}

		db := db.GetDb()
		err = db.Table(tableName).Where(searchCriteria).Updates(update).Error
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		if updateBody.ResourceIndex.Name != "" && updateBody.ResourceIndex.ResourceType != "" {
			jsonByte, err := json.Marshal(update)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}

			var createdResponse CreatedDBResponse
			err = json.Unmarshal(jsonByte, &createdResponse)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}

			newResource := models.Resource{
				Name:         updateBody.ResourceIndex.Name,
				Description:  updateBody.ResourceIndex.Description,
				ResourceID:   createdResponse.ID,
				ResourceType: updateBody.ResourceIndex.ResourceType,
			}

			err = db.Table(models.RESOURCE_MODEL_NAME).Where("resourceId = ?", createdResponse.ID).Updates(&newResource).Error
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}
		}

		return ctx.Status(http.StatusOK).JSON(fiber.Map{"message": "Document updated successfully"})
	}
}
