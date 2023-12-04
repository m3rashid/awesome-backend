package auth

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var AuthModule = module.Module{
	Name: "auth",
	Models: []interface{}{
		&models.UserGroup{},
		&models.Profile{},
		&models.User{},
	},
	Resources: module.Resources{
		models.USER_MODEL_NAME: models.ResourceIndex{
			NameKey:        "name",
			DescriptionKey: "email",
		},
		models.PROFILE_MODEL_NAME: models.ResourceIndex{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/all": {
			Description: "List all users",
			Controller:  controller.List[models.User](models.USER_MODEL_NAME),
			Permissions: module.RoutePermissions{
				"user": module.LIST,
			},
		},
		"/update": {
			Description: "Update user",
			// Controller:  controller.Update[models.User](models.USER_MODEL_NAME, ),
			Permissions: module.RoutePermissions{
				"user": module.EDIT,
			},
		},
		"": {
			Description: "Test auth",
			Controller:  GetInitialUser(),
			Permissions: module.RoutePermissions{},
		},
		"/profile/all": {
			Description: "List all profiles",
			Controller:  controller.List[models.Profile](models.PROFILE_MODEL_NAME),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{
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
