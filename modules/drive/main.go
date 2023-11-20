package drive

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/modules"
)

var DriveModule = modules.Module{
	Name: "drive",
	Models: []interface{}{
		&models.DriveFile{},
	},
	Resources: []modules.Resource{
		{
			Name:         "file",
			ResourceType: models.DRIVE_FILE_MODEL_NAME,
			Permissions:  []modules.PermissionPolicy{},
		},
	},
	ProtectedRoutes: modules.RouteConfig{
		"/all": {
			Description: "List all files",
			Controller:  controller.List[models.DriveFile](models.DRIVE_FILE_MODEL_NAME),
			Tests:       []modules.TestRoute{},
		},
	},
	AnonymousRoutes: modules.RouteConfig{},
}
