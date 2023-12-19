package dashboard

import (
	"awesome/models"
	"awesome/utils"
)

var DashboardModule = utils.Module{
	Name: "dashboard",
	Models: []interface{}{
		&models.Dashboard{},
		&models.DashboardWidget{},
	},
	ProtectedRoutes: utils.ProtectedRouteConfig{},
	AnonymousRoutes: utils.AnonymousRouteConfig{},
}
