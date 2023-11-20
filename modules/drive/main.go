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
	Resources: modules.Resources{
		models.DRIVE_FILE_MODEL_NAME: models.ResourceIndex{},
	},
	ProtectedRoutes: modules.ProtectedRouteConfig{
		"/all": {
			Description: "List all files",
			Controller:  controller.List[models.DriveFile](models.DRIVE_FILE_MODEL_NAME),
			Permissions: modules.RoutePermissions{
				"driveFile": modules.LIST,
			},
		},
	},
	AnonymousRoutes: modules.AnonymousRouteConfig{},
}
