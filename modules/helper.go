package modules

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	permission "github.com/m3rashid/awesome/modules/permission/schema"
	search "github.com/m3rashid/awesome/modules/search/schema"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Controller = map[string]fiber.Handler

type Module struct {
	Name            string
	Resources       []Resource
	AnonymousRoutes Controller
	ProtectedRoutes Controller
}

type Permission = map[string]struct {
	Relation permission.PermissionRelation `json:"relation"`
	Object   primitive.ObjectID            `json:"object"`
}

type Resource struct {
	Name          string               `json:"name"`
	ResourceType  string               `json:"resourceType"`
	ResourceIndex search.ResourceIndex `json:"resourceIndex"`
	Permissions   Permission           `json:"permissions"`
}

func (m Module) Stringify() (string, error) {
	obj := struct {
		Name      string     `json:"name"`
		Resources []Resource `json:"resources"`
	}{Name: m.Name, Resources: m.Resources}
	jsonObj, err := json.Marshal(obj)
	return string(jsonObj), err
}
