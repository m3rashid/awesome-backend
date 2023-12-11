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

func GetUserGroupsModifyDbCall(db *gorm.DB, listBody controller.ListBody) (*gorm.DB, error) {
	jsonByte, err := json.Marshal(listBody.SearchCriteria)
	if err != nil {
		return nil, err
	}

	var body GetUserChatsBody
	err = json.Unmarshal(jsonByte, &body)
	if err != nil {
		return nil, err
	}

	return db.Table("community_groups").Where("id IN (?)", db.Table("community_group_members_relation").
		Select("community_group_id").
		Where("user_id IN ?", []string{fmt.Sprint(body.ID)}),
	).Or("\"createdById\" = (?)", body.ID), nil
}
