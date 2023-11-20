package search

import (
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/modules"
)

var SearchModule = modules.Module{
	Name: "search",
	Models: []interface{}{
		&models.Resource{},
		&models.ActionLog{},
	},
	Resources:       modules.Resources{},
	ProtectedRoutes: modules.ProtectedRouteConfig{},
	AnonymousRoutes: modules.AnonymousRouteConfig{
		"/": {
			Description: "Search",
			Controller:  HandleSearch(),
			Tests:       []modules.TestRoute{},
		},
	},
}
