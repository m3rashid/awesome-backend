package crm

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var CRMModule = utils.Module{
	Name: "crm",
	Models: []interface{}{
		&models.Lead{},
		&models.LeadTimelineEvent{},
		&models.LeadTask{},
		&models.Campaign{},
		&models.Referral{},
	},
	SchemaMap: utils.SchemaMap{
		models.LEAD_MODEL_NAME:     models.LeadTableSchemaMap,
		models.CAMPAIGN_MODEL_NAME: models.CampaignTableSchemaMap,
	},
	ProtectedRoutes: utils.ProtectedRoutes{
		"/leads": {
			Description: "List all leads",
			Controller: controller.List[models.Lead](
				models.LEAD_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/leads/get": {
			Description: "Get a single lead",
			Controller: controller.Get[models.Lead](
				controller.GetOptions[models.Lead]{},
			),
		},
		"/leads/create": {
			Description: "Create a lead",
			Controller: controller.Create[models.Lead](
				models.LEAD_MODEL_NAME,
				controller.CreateOptions[models.Lead]{},
			),
		},
		"/leads/update": {
			Description: "Update a lead",
			Controller: controller.Update[models.Lead](
				models.LEAD_MODEL_NAME,
				controller.UpdateOptions[models.Lead]{},
			),
		},

		"/events": {
			Description: "List all events",
			Controller: controller.List[models.LeadTimelineEvent](
				models.LEAD_TIMELINE_EVENT_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/events/get": {
			Description: "Get a single event",
			Controller: controller.Get[models.LeadTimelineEvent](
				controller.GetOptions[models.LeadTimelineEvent]{},
			),
		},
		"/events/create": {
			Description: "Create an event",
			Controller: controller.Create[models.LeadTimelineEvent](
				models.LEAD_TIMELINE_EVENT_MODEL_NAME,
				controller.CreateOptions[models.LeadTimelineEvent]{},
			),
		},
		"/events/update": {
			Description: "Update an event",
			Controller: controller.Update[models.LeadTimelineEvent](
				models.LEAD_TIMELINE_EVENT_MODEL_NAME,
				controller.UpdateOptions[models.LeadTimelineEvent]{},
			),
		},

		"/tasks": {
			Description: "List all tasks",
			Controller: controller.List[models.LeadTask](
				models.LEAD_TASK_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/tasks/get": {
			Description: "Get a single task",
			Controller: controller.Get[models.LeadTask](
				controller.GetOptions[models.LeadTask]{},
			),
		},
		"/tasks/create": {
			Description: "Create a task",
			Controller: controller.Create[models.LeadTask](
				models.LEAD_TASK_MODEL_NAME,
				controller.CreateOptions[models.LeadTask]{},
			),
		},
		"/tasks/update": {
			Description: "Update a task",
			Controller: controller.Update[models.LeadTask](
				models.LEAD_TASK_MODEL_NAME,
				controller.UpdateOptions[models.LeadTask]{},
			),
		},

		"/campaigns": {
			Description: "List all campaigns",
			Controller: controller.List[models.Campaign](
				models.CAMPAIGN_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/campaigns/get": {
			Description: "Get a single campaign",
			Controller: controller.Get[models.Campaign](
				controller.GetOptions[models.Campaign]{},
			),
		},
		"/campaigns/create": {
			Description: "Create a campaign",
			Controller: controller.Create[models.Campaign](
				models.CAMPAIGN_MODEL_NAME,
				controller.CreateOptions[models.Campaign]{},
			),
		},
		"/campaigns/update": {
			Description: "Update a campaign",
			Controller: controller.Update[models.Campaign](
				models.CAMPAIGN_MODEL_NAME,
				controller.UpdateOptions[models.Campaign]{},
			),
		},

		"/referrals": {
			Description: "List all referrals",
			Controller: controller.List[models.Referral](
				models.REFERRAL_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/referrals/get": {
			Description: "Get a single referral",
			Controller: controller.Get[models.Referral](
				controller.GetOptions[models.Referral]{},
			),
		},
		"/referrals/create": {
			Description: "Create a referral",
			Controller: controller.Create[models.Referral](
				models.REFERRAL_MODEL_NAME,
				controller.CreateOptions[models.Referral]{},
			),
		},
		"/referrals/update": {
			Description: "Update a referral",
			Controller: controller.Update[models.Referral](
				models.REFERRAL_MODEL_NAME,
				controller.UpdateOptions[models.Referral]{},
			),
		},
	},
	AnonymousRoutes: utils.AnonymousRoutes{},
}
