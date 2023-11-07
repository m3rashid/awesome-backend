package modules

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	search "github.com/m3rashid/awesome/modules/search/schema"
)

type Controller = map[string]fiber.Handler

type Module struct {
	Name                string
	Resources           []Resource
	AnonymousRoutes     Controller
	AuthenticatedRoutes Controller
}

type Permission = []string

type Resource struct {
	Name                   string               `json:"name"`
	ResourceType           string               `json:"resourceType"`
	ResourceIndex          search.ResourceIndex `json:"resourceIndex"`
	ActionPermissions      Permission           `json:"actionPermissions"`
	IndependentPermissions Permission           `json:"independentPermissions"`
}

func (m Module) Stringify() (string, error) {
	obj := struct {
		Name      string     `json:"name"`
		Resources []Resource `json:"resources"`
	}{Name: m.Name, Resources: m.Resources}
	jsonObj, err := json.Marshal(obj)
	return string(jsonObj), err
}
