package controller

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
)

func List[T interface{}](tableName string) func(*fiber.Ctx) error {
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

		err = db.Order("id").Limit(paginationOptions.Limit).Offset(int(paginationOptions.Page-1*paginationOptions.Limit)).Find(&results, searchCriteria).Error
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
		fmt.Println(response)
		return ctx.Status(http.StatusOK).JSON(response)
	}
}
