package drive

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
)

var DriveModule = modules.Module{
	Name: "drive",
	Models: []interface{}{
		&File{},
	},
	Resources: []modules.Resource{
		{
			Name:         "file",
			ResourceType: FILE_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.RouteConfig{
		"/all": {
			Description: "List all files",
			Controller:  controller.List[File](FILE_MODEL_NAME),
			Tests:       []modules.TestRoute{},
		},
	},
	AnonymousRoutes: modules.RouteConfig{},
}
