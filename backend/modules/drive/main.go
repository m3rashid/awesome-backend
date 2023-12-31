package drive

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var DriveModule = utils.Module{
	Name: "drive",
	Models: []interface{}{
		&models.DriveFile{},
	},
	SchemaMap: utils.SchemaMap{
		models.DRIVE_FILE_MODEL_NAME: models.DriveFileTableSchemaMap,
	},
	ProtectedRoutes: utils.ProtectedRoutes{
		"/all": {
			Description: "List all files",
			Controller: controller.List[models.DriveFile](
				models.DRIVE_FILE_MODEL_NAME, controller.ListOptions{},
			),
			Permissions: utils.RoutePermissions{
				"driveFile": utils.LIST,
			},
		},
		"/signed-url/put": {
			Description: "Get a signed URL to upload a file",
			Controller:  GetSignedUrlForPut,
		},
	},
	AnonymousRoutes: utils.AnonymousRoutes{},
}
