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

type ResourcePermission = string

const (
	CREATE ResourcePermission = "create"
	EDIT   ResourcePermission = "edit"
	DELETE ResourcePermission = "delete"
	VIEW   ResourcePermission = "view"
	LIST   ResourcePermission = "list"
)

type RoutePermissions = map[string]ResourcePermission

type ProtectedRouteConfig = map[string]struct {
	Controller  fiber.Handler
	Description string
	Tests       []TestRoute
	Permissions RoutePermissions
}

type AnonymousRouteConfig = map[string]struct {
	Controller  fiber.Handler
	Description string
	Tests       []TestRoute
}

type Resources = map[string]models.ResourceIndex

type Module struct {
	Name            string
	Resources       Resources
	Models          []interface{}
	AnonymousRoutes AnonymousRouteConfig
	ProtectedRoutes ProtectedRouteConfig
}

// map of db model name to resourceIndex

func (m Module) Stringify() (string, error) {
	obj := struct {
		Name      string        `json:"name"`
		Resources Resources     `json:"resources"`
		Models    []interface{} `json:"models"`
	}{Name: m.Name, Resources: m.Resources}
	jsonObj, err := json.Marshal(obj)
	return string(jsonObj), err
}
