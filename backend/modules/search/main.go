package search

import (
	"awesome/models"
	"awesome/module"
)

var SearchModule = module.Module{
	Name: "search",
	Models: []interface{}{
		&models.Resource{},
		&models.ActionLog{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{},
	AnonymousRoutes: module.AnonymousRouteConfig{
		"/": {
			Description: "Search",
			Controller:  HandleSearch(),
		},
	},
}
