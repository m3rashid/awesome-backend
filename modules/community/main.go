package community

import (
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var CommunityModule = module.Module{
	Name: "community",
	Models: []interface{}{
		&models.Post{},
		&models.Topic{},
		&models.Comment{},
	},
	Resources: module.Resources{
		models.POST_MODEL_NAME: models.ResourceIndex{
			NameKey:        "title",
			DescriptionKey: "body",
		},
		models.TOPIC_MODEL_NAME: models.ResourceIndex{
			NameKey:        "name",
			DescriptionKey: "",
		},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
