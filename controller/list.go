package controller

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/db"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func List[T interface{}](collectionName string) func(*fiber.Ctx) error {
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

		collection := db.GetCollection(collectionName)
		opts := options.Find()
		opts.SetSort(map[string]int{CREATED_AT_FIELD: -1})
		opts.SetSkip(int64((paginationOptions.Page - 1) * paginationOptions.Limit))
		opts.SetLimit(int64(paginationOptions.Limit))

		cursor, err := collection.Find(ctx.Context(), searchCriteria, opts)
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		var results []T
		err = cursor.All(ctx.Context(), &results)
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		docsCount, err := collection.CountDocuments(ctx.Context(), searchCriteria)
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}

		response := PaginationResponse[T]{
			Docs:            results,
			Limit:           paginationOptions.Limit,
			Count:           int64(len(results)),
			TotalDocs:       docsCount,
			CurrentPage:     paginationOptions.Page,
			HasNextPage:     docsCount > (paginationOptions.Page * paginationOptions.Limit),
			HasPreviousPage: paginationOptions.Page > 1,
		}
		fmt.Println(response)
		return ctx.Status(http.StatusOK).JSON(response)
	}
}
