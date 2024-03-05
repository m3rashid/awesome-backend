package dashboard

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var DashboardModule = utils.Module{
	Name: "dashboard",
	Models: []interface{}{
		&models.Dashboard{},
		&models.DashboardWidget{},
	},
	SchemaMap: utils.SchemaMap{},
	ProtectedRoutes: utils.ProtectedRoutes{
		"/create": {
			Description: "Create a dashboard",
			Controller: controller.Create[models.Dashboard](
				models.DASHBOARD_MODEL_NAME,
				controller.CreateOptions[models.Dashboard]{},
			),
		},
		"/update": {
			Description: "Update a dashboard",
			Controller: controller.Update[models.Dashboard](
				models.DASHBOARD_MODEL_NAME,
				controller.UpdateOptions[models.Dashboard]{},
			),
		},
		"/get": {
			Description: "Get a single dashboard",
			Controller: controller.Get[models.Dashboard](
				controller.GetOptions[models.Dashboard]{},
			),
		},
		"/schemas/all": {
			Description: "Get all model Schema maps",
			Controller:  GetAllSchema,
		},
		"/widgets": {
			Description: "List dashboard widgets",
			Controller: controller.List[models.DashboardWidget](
				models.DASHBOARD_WIDGET_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/widgets/create": {
			Description: "Create a widget",
			Controller: controller.Create[models.DashboardWidget](
				models.DASHBOARD_WIDGET_MODEL_NAME,
				controller.CreateOptions[models.DashboardWidget]{},
			),
		},
		"widgets/update": {
			Description: "Update a dashboard widget",
			Controller: controller.Update[models.DashboardWidget](
				models.DASHBOARD_WIDGET_MODEL_NAME,
				controller.UpdateOptions[models.DashboardWidget]{},
			),
		},
		"/widgets/get": {
			Description: "Get a single dashboard widget",
			Controller: controller.Get[models.DashboardWidget](
				controller.GetOptions[models.DashboardWidget]{},
			),
		},
	},
	AnonymousRoutes: utils.AnonymousRoutes{},
}
