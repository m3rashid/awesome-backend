package drive

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
	drive "github.com/m3rashid/awesome/modules/drive/schema"
)

var DriveModule = modules.Module{
	Name: "drive",
	Models: []interface{}{
		&drive.File{},
	},
	Resources: []modules.Resource{
		{
			Name:         "file",
			ResourceType: drive.FILE_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.Controller{
		"/all": controller.List[drive.File](drive.FILE_MODEL_NAME),
	},
	AnonymousRoutes: modules.Controller{},
}
