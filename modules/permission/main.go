package permission

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
	permission "github.com/m3rashid/awesome/modules/permission/schema"
)

var PermissionModule = modules.Module{
	Name: "permission",
	Resources: []modules.Resource{
		{
			Name:         "permission",
			ResourceType: permission.PERMISSION_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.Controller{
		"/all": controller.List[permission.Permission](permission.PERMISSION_MODEL_NAME),
	},
	AnonymousRoutes: modules.Controller{
		"/check": CheckPermissionApi(),
	},
}
