package auth

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
	"github.com/m3rashid/awesome/modules/helpers"
)

var AuthModule = modules.Module{
	Name: "auth",
	Models: []interface{}{
		&User{},
		&Profile{},
		&UserGroup{},
	},
	Resources: []modules.Resource{
		{
			Name:         "user",
			ResourceType: USER_MODEL_NAME,
			ResourceIndex: helpers.ResourceIndex{
				NameKey:        "name",
				DescriptionKey: "email",
				DisplayUrl:     "/user/:rId",
			},
		},
		{
			Name:         "profile",
			ResourceType: PROFILE_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.RouteConfig{
		"/users": {
			Description: "List all users",
			Controller:  controller.List[User](USER_MODEL_NAME),
			Tests:       GetAllUsersTests,
		},
		"": {
			Description: "Test auth",
			Controller:  AuthTest(),
			Tests:       AuthTestTests,
		},
	},
	AnonymousRoutes: modules.RouteConfig{
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
