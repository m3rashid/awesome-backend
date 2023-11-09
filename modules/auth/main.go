package auth

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
	auth "github.com/m3rashid/awesome/modules/auth/schema"
	search "github.com/m3rashid/awesome/modules/search/schema"
)

var AuthModule = modules.Module{
	Name: "auth",
	Resources: []modules.Resource{
		{
			Name:         "user",
			ResourceType: auth.USER_MODEL_NAME,
			ResourceIndex: search.ResourceIndex{
				NameKey:        "name",
				DescriptionKey: "email",
				DisplayUrl:     "/user/:rId",
			},
		},
		{
			Name:         "profile",
			ResourceType: auth.PROFILE_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.Controller{
		"/users": controller.List[auth.User](auth.USER_MODEL_NAME),
		"":       AuthTest(),
	},
	AnonymousRoutes: modules.Controller{
		"/login":    Login(),
		"/register": Register(),
	},
}
