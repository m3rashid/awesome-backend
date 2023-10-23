package auth

import (
	"github.com/m3rashid/awesome/modules"
	auth "github.com/m3rashid/awesome/modules/auth/schema"
	permission "github.com/m3rashid/awesome/modules/permission"
	search "github.com/m3rashid/awesome/modules/search/schema"
)

var AuthModule = modules.Module{
	Name: "auth",
	Permissions: []permission.ModulePermission{
		{
			Name:         "user",
			ResourceType: auth.USER_MODEL_NAME,
			ResourceIndex: search.ResourceIndex{
				NameKey:        "name",
				DescriptionKey: "email",
				DisplayUrl:     "/user/:rId",
			},
			ActionPermissions:      permission.Permission{},
			IndependentPermissions: permission.Permission{},
		},
		{
			Name:          "profile",
			ResourceType:  auth.PROFILE_MODEL_NAME,
			ResourceIndex: search.ResourceIndex{},
			ActionPermissions: permission.Permission{
				"CAN_VIEW_PROFILE":   {},
				"CAN_EDIT_PROFILE":   {},
				"CAN_DELETE_PROFILE": {},
			},
			IndependentPermissions: permission.Permission{
				"CAN_CREATE_PROFILE": {},
			},
		},
	},
	AuthenticatedRoutes: modules.Controller{
		"": AuthTest(),
	},
	AnonymousRoutes: modules.Controller{
		"/login":    Login(),
		"/register": Register(),
	},
}
