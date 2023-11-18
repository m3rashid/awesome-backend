package search

import (
	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/modules/helpers"
)

func HandleSearch() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		searchBody := struct {
			Text string `json:"text" validate:"required"`
		}{}
		if err := ctx.BodyParser(&searchBody); err != nil {
			return ctx.Status(fiber.StatusBadRequest).SendString("Could Not Parse Body")
		}
		return ctx.Status(fiber.StatusOK).Send([]byte("Hello, World!"))
	}
}

func CreateResource(
	Name string,
	ResourceID uint,
	ResourceType string,
	Description string,
) error {
	newResource := helpers.Resource{
		Name:         Name,
		Description:  Description,
		ResourceID:   ResourceID,
		ResourceType: ResourceType,
	}

	db := db.GetDb()
	return db.Create(&newResource).Error
}
