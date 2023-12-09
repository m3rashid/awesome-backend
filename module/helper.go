package module

import (
	"github.com/gofiber/fiber/v2"
)

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
	HttpMethod  string // default POST
	Controller  fiber.Handler
	Description string
	Permissions RoutePermissions
}

type AnonymousRouteConfig = map[string]struct {
	HttpMethod  string
	Controller  fiber.Handler
	Description string
}

type Module struct {
	Name            string
	Models          []interface{}
	AnonymousRoutes AnonymousRouteConfig
	ProtectedRoutes ProtectedRouteConfig
}
