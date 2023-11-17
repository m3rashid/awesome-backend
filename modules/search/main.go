package search

import (
	"github.com/m3rashid/awesome/modules"
	search "github.com/m3rashid/awesome/modules/search/schema"
)

var SearchModule = modules.Module{
	Name: "search",
	Models: []interface{}{
		&search.Resource{},
	},
	Resources: []modules.Resource{},
	ProtectedRoutes: modules.Controller{
		"/search": HandleSearch(),
	},
	AnonymousRoutes: modules.Controller{},
}
