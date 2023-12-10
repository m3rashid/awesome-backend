package projects

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var ProjectModule = module.Module{
	Name: "projects",
	Models: []interface{}{
		&models.Project{},
		&models.ProjectTask{},
		&models.ProjectTag{},
		&models.ProjectTaskComments{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"": {
			Description: "List all projects",
			Controller:  controller.List[models.Project](models.PROJECT_MODEL_NAME),
		},
		"/create": {
			Description: "Create a project",
			Controller:  controller.Create[models.Project](),
		},
		"/get": {
			Description: "Get a single Project",
			Controller:  controller.Get[models.Project](),
		},
		"/update": {
			Description: "Update a project",
			Controller:  controller.Update[models.Project](models.PROJECT_MODEL_NAME),
		},

		"/tasks": {
			Description: "List all tasks",
			Controller:  controller.List[models.ProjectTask](models.PROJECT_TASK_MODEL_NAME),
		},
		"/tasks/create": {
			Description: "Create a task",
			Controller:  controller.Create[models.ProjectTask](),
		},
		"/tasks/get": {
			Description: "Get a single task",
			Controller:  controller.Get[models.ProjectTask](),
		},
		"/tasks/update": {
			Description: "Update a task",
			Controller:  controller.Update[models.ProjectTask](models.PROJECT_TASK_MODEL_NAME),
		},

		"/tags": {
			Description: "List all tags",
			Controller:  controller.List[models.ProjectTag](models.PROJECT_TAG_MODEL_NAME),
		},
		"/tags/create": {
			Description: "Create a tag",
			Controller:  controller.Create[models.ProjectTag](),
		},
		"/tags/get": {
			Description: "Get a single tag",
			Controller:  controller.Get[models.ProjectTag](),
		},
		"/tags/update": {
			Description: "Update a tag",
			Controller:  controller.Update[models.ProjectTag](models.PROJECT_TAG_MODEL_NAME),
		},

		"/comments": {
			Description: "List all comments",
			Controller:  controller.List[models.ProjectTaskComments](models.PROJECT_TASK_COMMENT_MODEL_NAME),
		},
		"/comments/create": {
			Description: "Create a comment",
			Controller:  controller.Create[models.ProjectTaskComments](),
		},
		"/comments/get": {
			Description: "Get a single comment",
			Controller:  controller.Get[models.ProjectTaskComments](),
		},
		"/comments/update": {
			Description: "Update a comment",
			Controller:  controller.Update[models.ProjectTaskComments](models.PROJECT_TASK_COMMENT_MODEL_NAME),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
