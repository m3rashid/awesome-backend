package search

import (
	"github.com/m3rashid/awesome/modules"
)

var SearchModule = modules.Module{
	Name:      "search",
	Resources: []modules.Resource{},
	ProtectedRoutes: modules.Controller{
		"/search": HandleSearch(),
	},
	AnonymousRoutes: modules.Controller{},
}
