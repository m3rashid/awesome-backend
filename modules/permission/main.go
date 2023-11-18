package permission

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
	"github.com/m3rashid/awesome/modules/helpers"
)

var PermissionModule = modules.Module{
	Name: "permission",
	Models: []interface{}{
		&helpers.Permission{},
	},
	Resources: []modules.Resource{
		{
			Name:         "permission",
			ResourceType: helpers.PERMISSION_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.Controller{
		"/all": controller.List[helpers.Permission](helpers.PERMISSION_MODEL_NAME),
	},
	AnonymousRoutes: modules.Controller{
		"/check": CheckPermissionApi(),
	},
}
