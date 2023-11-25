package dashboard

import (
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var DashboardModule = module.Module{
	Name: "dashboard",
	Models: []interface{}{
		&models.DashboardWidget{},
		&models.Dashboard{},
	},
	Resources: module.Resources{
		models.DASHBOARD_MODEL_NAME: models.ResourceIndex{
			NameKey:        "name",
			DescriptionKey: "description",
		},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
