package permission

import (
	"context"

	"github.com/m3rashid/awesome/db"
	permission "github.com/m3rashid/awesome/modules/permission/schema"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CheckPermission(userID primitive.ObjectID, objectID primitive.ObjectID, relation permission.PermissionRelation) bool {
	collection := db.GetCollection(permission.PERMISSION_MODEL_NAME)

	permission := permission.Permission{}
	err := collection.FindOne(context.Background(), bson.M{
		"user":   userID,
		"object": objectID,
	}).Decode(&permission)
	if err != nil {
		return false
	}

	return permission.Relation&int64(relation) != 0
}
