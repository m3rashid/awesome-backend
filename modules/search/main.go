package search

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var SearchModule = module.Module{
	Name: "search",
	Models: []interface{}{
		&models.Resource{},
		&models.ActionLog{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/create": {
			Description: "Create Resource",
			Controller:  controller.Create[models.Resource](),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{
		"/": {
			Description: "Search",
			Controller:  HandleSearch(),
		},
	},
}
