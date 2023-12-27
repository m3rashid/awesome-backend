package search

import (
	"awesome/models"
	"awesome/utils"
)

var SearchModule = utils.Module{
	Name: "search",
	Models: []interface{}{
		&models.Resource{},
		&models.ActionLog{},
	},
	ProtectedRoutes: utils.ProtectedRouteConfig{},
	AnonymousRoutes: utils.AnonymousRouteConfig{
		"/": {
			Description: "Search",
			Controller:  HandleSearch,
		},
	},
}
