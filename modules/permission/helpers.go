package permission

import (
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/modules/helpers"
)

func CheckPermission(userID uint, objectID uint, relation helpers.PermissionRelation) bool {
	db := db.GetDb()
	p := helpers.Permission{}
	err := db.Model(&p).Where("user = ? AND object = ?", userID, objectID).Error
	if err != nil {
		return false
	}
	return p.Relation&int64(relation) != 0
}
