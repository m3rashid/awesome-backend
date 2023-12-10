package dashboard

import (
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
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
