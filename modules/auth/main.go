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
	// Resources: module.Resources{
	// 	models.USER_MODEL_NAME: models.ResourceIndex{
	// 		NameKey:        "name",
	// 		DescriptionKey: "email",
	// 	},
	// 	models.PROFILE_MODEL_NAME: models.ResourceIndex{},
	// },
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/all": {
			Description: "List all users",
			Controller:  controller.List[models.User](models.USER_MODEL_NAME),
			Permissions: module.RoutePermissions{
				"user": module.LIST,
			},
		},
		"/user": {
			Description: "Get any user",
			Controller:  controller.Get[models.User](),
		},
		"/update": {
			Description: "Update user",
			Controller:  controller.Update[models.User](models.USER_MODEL_NAME),
			Permissions: module.RoutePermissions{
				"user": module.EDIT,
			},
		},

		"/init": {
			Description: "Init automatic auth at refresh",
			Controller:  GetInitialUser(),
			Permissions: module.RoutePermissions{},
		},
		"/profiles": {
			Description: "List all profiles",
			Controller:  controller.List[models.Profile](models.PROFILE_MODEL_NAME),
		},
		"/profile": {
			Description: "Get profile",
			Controller:  controller.Get[models.Profile](),
		},
		"/profile/update": {
			Description: "Update profile",
			Controller:  controller.Update[models.Profile](models.PROFILE_MODEL_NAME),
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
