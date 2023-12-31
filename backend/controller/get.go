package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Get[T interface{}](options GetOptions[T]) func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		var requestBody GetBody[T]
		err := ctx.BodyParser(&requestBody)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}

		var db *gorm.DB
		if options.GetDB != nil {
			db = options.GetDB()
		} else {
			db, err = GetDbFromRequestOrigin(ctx)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
		}

		var column T
		if requestBody.Populate != nil {
			for _, populate := range requestBody.Populate {
				db = db.Preload(populate)
			}
		}

		err = db.Where(requestBody.SearchCriteria).First(&column).Error
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		return ctx.Status(http.StatusOK).JSON(column)
	}
}
