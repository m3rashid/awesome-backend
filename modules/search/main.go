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
	Resources: []modules.Resource{},
	ProtectedRoutes: modules.RouteConfig{
		"/search": {
			Description: "Search",
			Controller:  HandleSearch(),
			Tests:       []modules.TestRoute{},
		},
	},
	AnonymousRoutes: modules.RouteConfig{},
}
