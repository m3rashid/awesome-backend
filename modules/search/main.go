package search

import (
	"github.com/m3rashid/awesome/modules"
	"github.com/m3rashid/awesome/modules/helpers"
)

var SearchModule = modules.Module{
	Name: "search",
	Models: []interface{}{
		&helpers.Resource{},
		&helpers.ActionLog{},
	},
	Resources: []modules.Resource{},
	ProtectedRoutes: modules.Controller{
		"/search": HandleSearch(),
	},
	AnonymousRoutes: modules.Controller{},
}
