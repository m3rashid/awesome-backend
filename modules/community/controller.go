package community

import (
	"encoding/json"
	"fmt"

	"github.com/m3rashid/awesome/controller"
	"gorm.io/gorm"
)

type GetUserChatsBody struct {
	ID uint `json:"userId" validate:"required"`
}

func GetUserGroups[T interface{}](db *gorm.DB, paginationOptions controller.PaginationOptions, listBody controller.ListBody) (controller.PaginationResponse[T], error) {
	jsonByte, err := json.Marshal(listBody.SearchCriteria)
	if err != nil {
		return controller.PaginationResponse[T]{}, err
	}
	var body GetUserChatsBody
	err = json.Unmarshal(jsonByte, &body)
	if err != nil {
		return controller.PaginationResponse[T]{}, err
	}

	var results []T
	var docsCount int64

	err = db.Table("community_groups").Where("id IN (?)", db.Table("community_group_members_relation").
		Select("community_group_id").
		Where("user_id IN ?", []string{fmt.Sprint(body.ID)}),
	).Or("\"createdById\" = (?)", body.ID).Find(&results).Offset(int(paginationOptions.Page - 1*paginationOptions.Limit)).Error
	if err != nil {
		return controller.PaginationResponse[T]{}, err
	}

	err = db.Table("community_groups").Where("id IN (?)", db.Table("community_group_members_relation").
		Select("community_group_id").
		Where("user_id IN ?", []string{fmt.Sprint(body.ID)}),
	).Or("\"createdById\" = (?)", body.ID).Count(&docsCount).Error
	if err != nil {
		return controller.PaginationResponse[T]{}, err
	}

	return controller.PaginationResponse[T]{
		Docs:            results,
		Limit:           paginationOptions.Limit,
		Count:           int(len(results)),
		TotalDocs:       docsCount,
		CurrentPage:     paginationOptions.Page,
		HasNextPage:     docsCount > int64(paginationOptions.Page*paginationOptions.Limit),
		HasPreviousPage: paginationOptions.Page > 1,
	}, nil
}
