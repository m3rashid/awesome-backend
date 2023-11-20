package auth

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/modules"
)

var AuthModule = modules.Module{
	Name: "auth",
	Models: []interface{}{
		&models.User{},
		&models.Profile{},
		&models.UserGroup{},
	},
	Resources: modules.Resources{
		models.USER_MODEL_NAME: models.ResourceIndex{
			NameKey:        "name",
			DescriptionKey: "email",
			DisplayUrl:     "/user/:rId",
		},
		models.PROFILE_MODEL_NAME: models.ResourceIndex{},
	},
	ProtectedRoutes: modules.ProtectedRouteConfig{
		"/all": {
			Description: "List all users",
			Controller:  controller.List[models.User](models.USER_MODEL_NAME),
			Permissions: modules.RoutePermissions{
				"user": modules.LIST,
			},
		},
		"/update": {
			Description: "Update user",
			// Controller:  controller.Update[models.User](models.USER_MODEL_NAME, ),
			Permissions: modules.RoutePermissions{
				"user": modules.EDIT,
			},
		},
		"": {
			Description: "Test auth",
			Controller:  GetInitialUser(),
			Permissions: modules.RoutePermissions{},
		},
	},
	AnonymousRoutes: modules.AnonymousRouteConfig{
		"/login": {
			Description: "Login",
			Controller:  Login(),
		},
		"/register": {
			Description: "Register",
			Controller:  Register(),
		},
	},
}
