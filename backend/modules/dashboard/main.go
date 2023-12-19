package dashboard

import (
	"awesome/models"
	"awesome/module"
)

var DashboardModule = module.Module{
	Name: "dashboard",
	Models: []interface{}{
		&models.Dashboard{},
		&models.DashboardWidget{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
