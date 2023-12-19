package projects

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var ProjectModule = utils.Module{
	Name: "projects",
	Models: []interface{}{
		&models.Project{},
		&models.ProjectTask{},
		&models.ProjectTag{},
		&models.ProjectTaskComments{},
	},
	ProtectedRoutes: utils.ProtectedRouteConfig{
		"": {
			Description: "List all projects",
			Controller: controller.List[models.Project](
				models.PROJECT_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/create": {
			Description: "Create a project",
			Controller: controller.Create[models.Project](
				models.PROJECT_MODEL_NAME,
				controller.CreateOptions[models.Project]{},
			),
		},
		"/get": {
			Description: "Get a single Project",
			Controller: controller.Get[models.Project](
				controller.GetOptions[models.Project]{},
			),
		},
		"/update": {
			Description: "Update a project",
			Controller: controller.Update[models.Project](
				models.PROJECT_MODEL_NAME,
				controller.UpdateOptions[models.Project]{},
			),
		},

		"/tasks": {
			Description: "List all tasks",
			Controller: controller.List[models.ProjectTask](
				models.PROJECT_TASK_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/tasks/create": {
			Description: "Create a task",
			Controller: controller.Create[models.ProjectTask](
				models.PROJECT_TASK_MODEL_NAME,
				controller.CreateOptions[models.ProjectTask]{},
			),
		},
		"/tasks/get": {
			Description: "Get a single task",
			Controller: controller.Get[models.ProjectTask](
				controller.GetOptions[models.ProjectTask]{},
			),
		},
		"/tasks/update": {
			Description: "Update a task",
			Controller: controller.Update[models.ProjectTask](
				models.PROJECT_TASK_MODEL_NAME,
				controller.UpdateOptions[models.ProjectTask]{},
			),
		},

		"/tags": {
			Description: "List all tags",
			Controller: controller.List[models.ProjectTag](
				models.PROJECT_TAG_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/tags/create": {
			Description: "Create a tag",
			Controller: controller.Create[models.ProjectTag](
				models.PROJECT_TAG_MODEL_NAME,
				controller.CreateOptions[models.ProjectTag]{},
			),
		},
		"/tags/get": {
			Description: "Get a single tag",
			Controller: controller.Get[models.ProjectTag](
				controller.GetOptions[models.ProjectTag]{},
			),
		},
		"/tags/update": {
			Description: "Update a tag",
			Controller: controller.Update[models.ProjectTag](
				models.PROJECT_TAG_MODEL_NAME,
				controller.UpdateOptions[models.ProjectTag]{},
			),
		},

		"/comments": {
			Description: "List all comments",
			Controller: controller.List[models.ProjectTaskComments](
				models.PROJECT_TASK_COMMENT_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/comments/create": {
			Description: "Create a comment",
			Controller: controller.Create[models.ProjectTaskComments](
				models.PROJECT_TASK_COMMENT_MODEL_NAME,
				controller.CreateOptions[models.ProjectTaskComments]{},
			),
		},
		"/comments/get": {
			Description: "Get a single comment",
			Controller: controller.Get[models.ProjectTaskComments](
				controller.GetOptions[models.ProjectTaskComments]{},
			),
		},
		"/comments/update": {
			Description: "Update a comment",
			Controller: controller.Update[models.ProjectTaskComments](
				models.PROJECT_TASK_COMMENT_MODEL_NAME,
				controller.UpdateOptions[models.ProjectTaskComments]{},
			),
		},
	},
	AnonymousRoutes: utils.AnonymousRouteConfig{},
}
