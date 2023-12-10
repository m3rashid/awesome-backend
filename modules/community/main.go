package community

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var CommunityModule = module.Module{
	Name: "community",
	Models: []interface{}{
		&models.Post{},
		&models.Comment{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/posts": {
			Description: "Get all posts",
			Controller:  controller.List[models.Post](models.POST_MODEL_NAME),
		},
		"/post/create": {
			Description: "Create a post",
			Controller:  controller.Create[models.Post](),
		},
		"/post/get": {
			Description: "Get a single post",
			Controller:  controller.Get[models.Post](),
		},
		"/post/update": {
			Description: "Update a post",
			Controller:  controller.Update[models.Post](models.POST_MODEL_NAME),
		},

		"/comments": {
			Description: "List all comments",
			Controller:  controller.List[models.Comment](models.COMMENT_MODEL_NAME),
		},
		"/comments/create": {
			Description: "Create a comment",
			Controller:  controller.Create[models.Comment](),
		},
		"/comments/get": {
			Description: "Get a single comment",
			Controller:  controller.Get[models.Comment](),
		},
		"/comments/update": {
			Description: "Update a comment",
			Controller:  controller.Update[models.Comment](models.COMMENT_MODEL_NAME),
		},

		"/friendships": {
			Description: "List all friendships",
			Controller:  controller.List[models.Friendship](models.FRIENDSHIP_MODEL_NAME),
		},
		"/friendships/send-request": {
			Description: "Send a friend request",
			Controller:  controller.Create[models.FriendRequest](),
		},
		"/friendships/update": {
			Description: "Accept a friend request",
			Controller:  controller.Update[models.FriendRequest](models.FRIEND_REQUEST_MODEL_NAME),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
