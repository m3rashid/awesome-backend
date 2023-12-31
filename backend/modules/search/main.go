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
	SchemaMap:       utils.SchemaMap{},
	ProtectedRoutes: utils.ProtectedRoutes{},
	AnonymousRoutes: utils.AnonymousRoutes{
		"/": {
			Description: "Search",
			Controller:  HandleSearch,
		},
	},
}
