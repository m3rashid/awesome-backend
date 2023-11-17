package permission

import (
	"github.com/m3rashid/awesome/db"
	permission "github.com/m3rashid/awesome/modules/permission/schema"
)

func CheckPermission(userID uint, objectID uint, relation permission.PermissionRelation) bool {
	db := db.GetDb()
	p := permission.Permission{}
	err := db.Model(&p).Where("user = ? AND object = ?", userID, objectID).Error
	if err != nil {
		return false
	}
	return p.Relation&int64(relation) != 0
}
