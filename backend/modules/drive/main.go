package drive

import (
	"awesome/controller"
	"awesome/models"
	"awesome/module"
)

var DriveModule = module.Module{
	Name: "drive",
	Models: []interface{}{
		&models.DriveFile{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		// other drive routes are directly registered
		"/all": {
			Description: "List all files",
			Controller:  controller.List[models.DriveFile](models.DRIVE_FILE_MODEL_NAME, controller.ListOptions{}),
			Permissions: module.RoutePermissions{
				"driveFile": module.LIST,
			},
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
