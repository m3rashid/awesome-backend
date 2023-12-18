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
		&models.Friends{},
		&models.FriendRequest{},
		&models.CommunityGroup{},
		&models.CommunityChatMessage{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/posts": {
			Description: "Get all posts",
			Controller: controller.List[models.Post](
				models.POST_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/post/create": {
			Description: "Create a post",
			Controller: controller.Create[models.Post](
				models.POST_MODEL_NAME,
				controller.WorkflowOptions[models.Post]{},
			),
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
			Controller: controller.List[models.Comment](
				models.COMMENT_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/comments/create": {
			Description: "Create a comment",
			Controller: controller.Create[models.Comment](
				models.COMMENT_MODEL_NAME,
				controller.WorkflowOptions[models.Comment]{},
			),
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
			Controller: controller.List[models.Friends](
				models.FRIENDS_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/friendships/send-request": {
			Description: "Send a friend request",
			Controller: controller.Create[models.FriendRequest](
				models.FRIENDS_MODEL_NAME,
				controller.WorkflowOptions[models.FriendRequest]{},
			),
		},
		"/friendships/update": {
			Description: "Accept a friend request",
			Controller:  controller.Update[models.FriendRequest](models.FRIEND_REQUEST_MODEL_NAME),
		},

		"/groups": {
			Description: "List of groups",
			Controller: controller.List[models.CommunityGroup](
				models.COMMUNITY_GROUP_MODEL_NAME,
				controller.ListOptions{
					ModifyDbCall: GetUserGroupsModifyDbCall,
				}),
		},
		"/groups/get": {
			Description: "Get a single group",
			Controller:  controller.Get[models.CommunityGroup](),
		},
		"/groups/create": {
			Description: "Create a group",
			Controller: controller.Create[models.CommunityGroup](
				models.COMMUNITY_GROUP_MODEL_NAME,
				controller.WorkflowOptions[models.CommunityGroup]{},
			),
		},
		"/groups/update": {
			Description: "Update a group",
			Controller:  controller.Update[models.CommunityGroup](models.COMMUNITY_GROUP_MODEL_NAME),
		},

		"/chats": {
			Description: "List of chats",
			Controller: controller.List[models.CommunityChatMessage](
				models.COMMUNITY_CHAT_MESSAGE_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/chats/create": {
			Description: "Create a chat",
			Controller: controller.Create[models.CommunityChatMessage](
				models.COMMUNITY_CHAT_MESSAGE_MODEL_NAME,
				controller.WorkflowOptions[models.CommunityChatMessage]{},
			),
		},
		"/chats/update": {
			Description: "Update a chat",
			Controller:  controller.Update[models.CommunityChatMessage](models.COMMUNITY_CHAT_MESSAGE_MODEL_NAME),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
