package permission

import "go.mongodb.org/mongo-driver/bson/primitive"

const PERMISSION_MODEL_NAME = "permissions"

type PermissionRelation int64

const (
	READ   PermissionRelation = 1
	WRITE  PermissionRelation = 2
	UPDATE PermissionRelation = 4
	OWNER  PermissionRelation = 8
)

type Permission struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty" validate:""`
	User     primitive.ObjectID `json:"user" bson:"user" validate:"required"`
	Relation int64              `json:"relation" bson:"relation" validate:"required"`
	Object   primitive.ObjectID `json:"object" bson:"object" validate:"required"`
}
