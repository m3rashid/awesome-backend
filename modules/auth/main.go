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
			ActionPermissions:      modules.Permission{},
			IndependentPermissions: modules.Permission{},
		},
		{
			Name:          "profile",
			ResourceType:  auth.PROFILE_MODEL_NAME,
			ResourceIndex: search.ResourceIndex{},
			ActionPermissions: modules.Permission{
				"CAN_VIEW_PROFILE",
				"CAN_EDIT_PROFILE",
				"CAN_DELETE_PROFILE",
			},
			IndependentPermissions: modules.Permission{
				"CAN_CREATE_PROFILE",
			},
		},
	},
	AuthenticatedRoutes: modules.Controller{
		"":       AuthTest(),
		"/users": controller.List[auth.User](auth.USER_MODEL_NAME),
	},
	AnonymousRoutes: modules.Controller{
		"/login":    Login(),
		"/register": Register(),
	},
}
