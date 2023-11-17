package permission

const PERMISSION_MODEL_NAME = "permissions"

type PermissionRelation int64

const (
	READ   PermissionRelation = 1
	WRITE  PermissionRelation = 2
	UPDATE PermissionRelation = 4
	OWNER  PermissionRelation = 8
)

type Permission struct {
	ID            uint   `gorm:"primary_key" json:"id"`
	User          uint   `json:"user" gorm:"column:user" validate:"required"`
	Relation      int64  `json:"relation" gorm:"column:relation" validate:"required"`
	Object        string `json:"object" gorm:"column:object" validate:"required"` // object (_id) or group
	IsUserGroup   bool   `json:"isUserGroup" gorm:"column:isUserGroup" validate:"required"`
	IsObjectGroup bool   `json:"isObjectGroup" gorm:"column:isObjectGroup" validate:"required"`
}

func (Permission) TableName() string {
	return PERMISSION_MODEL_NAME
}
