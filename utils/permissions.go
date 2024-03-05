package utils

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

type ProtectedRoutes = map[string]struct {
	HttpMethod  string // default POST
	Controller  fiber.Handler
	Description string
	Permissions RoutePermissions
}

type AnonymousRoutes = map[string]struct {
	HttpMethod  string
	Controller  fiber.Handler
	Description string
}

type Schema = map[string]string
type SchemaMap = map[string]Schema

type Module struct {
	Name            string
	SchemaMap       SchemaMap
	Models          []interface{}
	AnonymousRoutes AnonymousRoutes
	ProtectedRoutes ProtectedRoutes
}
