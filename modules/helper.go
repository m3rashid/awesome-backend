package modules

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/modules/helpers"
)

type Controller = map[string]fiber.Handler

type Module struct {
	Name            string
	Resources       []Resource
	Models          []interface{}
	AnonymousRoutes Controller
	ProtectedRoutes Controller
}

type Permission = map[string]struct {
	Relation helpers.PermissionRelation `json:"relation"`
	Object   uint                       `json:"object"`
}

type Resource struct {
	Name          string                `json:"name"`
	ResourceType  string                `json:"resourceType"`
	ResourceIndex helpers.ResourceIndex `json:"resourceIndex"`
	Permissions   Permission            `json:"permissions"`
}

func (m Module) Stringify() (string, error) {
	obj := struct {
		Name      string     `json:"name"`
		Resources []Resource `json:"resources"`
	}{Name: m.Name, Resources: m.Resources}
	jsonObj, err := json.Marshal(obj)
	return string(jsonObj), err
}
