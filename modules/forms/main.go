package forms

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var FormsModule = module.Module{
	Name: "forms",
	Models: []interface{}{
		&models.Form{},
		&models.Response{},
	},
	Resources: module.Resources{
		models.FORMS_MODEL_NAME: models.ResourceIndex{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/all": {
			Description: "List all forms",
			Controller:  controller.List[models.Form](models.FORMS_MODEL_NAME),
		},
		"/create": {
			Description: "Create form",
			// Controller:  controller.Create[models.Form](models.FORMS_MODEL_NAME),
			Permissions: module.RoutePermissions{
				"user": module.CREATE,
			},
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
