package search

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/models"
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
) {
	newResource := models.Resource{
		Name:         Name,
		Description:  Description,
		ResourceID:   ResourceID,
		ResourceType: ResourceType,
	}

	db := db.GetDb()
	go func() {
		err := db.Create(&newResource).Error
		if err != nil {
			fmt.Println("Error Creating Resource with")
		}
	}()
}
