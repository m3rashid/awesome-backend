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
	Resources: []modules.Resource{
		{
			Name:         "user",
			ResourceType: models.USER_MODEL_NAME,
			ResourceIndex: models.ResourceIndex{
				NameKey:        "name",
				DescriptionKey: "email",
				DisplayUrl:     "/user/:rId",
			},
			Permissions: modules.ResourcePermissions{"create", "edit", "delete", "view", "viewAll"},
		},
		{
			Name:         "profile",
			ResourceType: models.PROFILE_MODEL_NAME,
			Permissions:  modules.ResourcePermissions{"create", "edit", "view", "delete", "viewAll"},
		},
	},
	ProtectedRoutes: modules.ProtectedRouteConfig{
		"/users": {
			Description: "List all users",
			Controller:  controller.List[models.User](models.USER_MODEL_NAME),
			Tests:       GetAllUsersTests,
			Permissions: modules.RoutePermissions{
				"user": {"viewAll"},
			},
		},
		"": {
			Description: "Test auth",
			Controller:  GetInitialUser(),
			Tests:       AuthTestTests,
			Permissions: modules.RoutePermissions{},
		},
	},
	AnonymousRoutes: modules.AnonymousRouteConfig{
		"/login": {
			Description: "Login",
			Controller:  Login(),
			Tests:       LoginTests,
		},
		"/register": {
			Description: "Register",
			Controller:  Register(),
			Tests:       RegisterTests,
		},
	},
}
