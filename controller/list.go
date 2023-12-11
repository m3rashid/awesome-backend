package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"gorm.io/gorm"
)

func List[T interface{}](tableName string, options ...func(db *gorm.DB, paginationOptions PaginationOptions, listBody ListBody) (PaginationResponse[T], error)) func(*fiber.Ctx) error {
	if len(options) > 1 {
		panic("List function can only accept one ListOptions")
	}

	return func(ctx *fiber.Ctx) error {
		var listBody ListBody
		err := ctx.BodyParser(&listBody)
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{"error": err.Error()})
		}

		paginationOptions := listBody.PaginationOptions
		searchCriteria := listBody.SearchCriteria

		if paginationOptions.Limit == 0 {
			paginationOptions.Limit = 20
		}
		if paginationOptions.Page == 0 {
			paginationOptions.Page = 1
		}

		if searchCriteria == nil {
			searchCriteria = map[string]interface{}{}
		}

		db := db.GetDb()
		var results []T

		if listBody.Populate != nil {
			for _, populate := range listBody.Populate {
				db = db.Preload(populate)
			}
		}

		if len(options) == 0 {
			err = db.Order("id DESC").Limit(paginationOptions.Limit).Offset(int(paginationOptions.Page-1*paginationOptions.Limit)).Find(&results, searchCriteria).Error
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}

			var docsCount int64
			err = db.Table(tableName).Where(searchCriteria).Count(&docsCount).Error
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}

			response := PaginationResponse[T]{
				Docs:            results,
				Limit:           paginationOptions.Limit,
				Count:           int(len(results)),
				TotalDocs:       docsCount,
				CurrentPage:     paginationOptions.Page,
				HasNextPage:     docsCount > int64(paginationOptions.Page*paginationOptions.Limit),
				HasPreviousPage: paginationOptions.Page > 1,
			}
			return ctx.Status(http.StatusOK).JSON(response)
		}

		paginatedResponse, err := options[0](db, paginationOptions, listBody)
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		return ctx.Status(http.StatusOK).JSON(paginatedResponse)
	}
}
