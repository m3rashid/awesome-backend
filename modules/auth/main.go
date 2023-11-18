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
	ProtectedRoutes: modules.Controller{
		"/users": controller.List[User](USER_MODEL_NAME),
		"":       AuthTest(),
	},
	AnonymousRoutes: modules.Controller{
		"/login":    Login(),
		"/register": Register(),
	},
}
