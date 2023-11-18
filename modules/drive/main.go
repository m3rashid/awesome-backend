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
	ProtectedRoutes: modules.Controller{
		"/all": controller.List[File](FILE_MODEL_NAME),
	},
	AnonymousRoutes: modules.Controller{},
}
