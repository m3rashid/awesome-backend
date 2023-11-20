package emails

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/modules"
)

var EmailModule = modules.Module{
	Name: "emails",
	Models: []interface{}{
		&models.Email{},
	},
	Resources: modules.Resources{
		models.EMAIL_MODEL_NAME: models.ResourceIndex{},
	},
	ProtectedRoutes: modules.ProtectedRouteConfig{
		"/all": {
			Description: "List all emails",
			Controller:  controller.List[models.Email](models.EMAIL_MODEL_NAME),
			Permissions: modules.RoutePermissions{
				"email": modules.LIST,
			},
		},
	},
	AnonymousRoutes: modules.AnonymousRouteConfig{},
}
