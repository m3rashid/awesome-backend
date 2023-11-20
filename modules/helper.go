package modules

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	"github.com/m3rashid/awesome/models"
)

type TestRoute struct {
	Method             string
	Description        string
	ExpectedStatusCode int
	ExpectedBody       interface{}
	RequestBody        interface{}
}

type ResourcePermissions = []string
type RoutePermissions = map[string]ResourcePermissions

type ProtectedRouteConfig = map[string]struct {
	Controller  fiber.Handler
	Description string
	Tests       []TestRoute
	Permissions RoutePermissions
	// permissions are defined on that route for more granular control
	// TODO: Permissions are not yet implemented
}

type AnonymousRouteConfig = map[string]struct {
	Controller  fiber.Handler
	Description string
	Tests       []TestRoute
}

type Module struct {
	Name            string
	Resources       []Resource
	Models          []interface{}
	AnonymousRoutes AnonymousRouteConfig
	ProtectedRoutes ProtectedRouteConfig
}

type Resource struct {
	Name          string               `json:"name"`
	ResourceType  string               `json:"resourceType"`
	ResourceIndex models.ResourceIndex `json:"resourceIndex"`
	Permissions   ResourcePermissions  `json:"permissions"`
	// all permissions are defined on resource to make it easier to manage
	// all available permissions on that resource must be defined here
}

func (m Module) Stringify() (string, error) {
	obj := struct {
		Name      string     `json:"name"`
		Resources []Resource `json:"resources"`
	}{Name: m.Name, Resources: m.Resources}
	jsonObj, err := json.Marshal(obj)
	return string(jsonObj), err
}
