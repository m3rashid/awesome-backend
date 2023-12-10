package crm

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var CRMModule = module.Module{
	Name: "crm",
	Models: []interface{}{
		&models.Lead{},
		&models.LeadTimelineEvent{},
		&models.LeadTask{},
		&models.Campaign{},
		&models.Referral{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/leads": {
			Description: "List all leads",
			Controller:  controller.List[models.Lead](models.LEAD_MODEL_NAME),
		},
		"/leads/get": {
			Description: "Get a single lead",
			Controller:  controller.Get[models.Lead](),
		},
		"/leads/create": {
			Description: "Create a lead",
			Controller:  controller.Create[models.Lead](),
		},
		"/leads/update": {
			Description: "Update a lead",
			Controller:  controller.Update[models.Lead](models.LEAD_MODEL_NAME),
		},

		"/events": {
			Description: "List all events",
			Controller:  controller.List[models.LeadTimelineEvent](models.LEAD_TIMELINE_EVENT_MODEL_NAME),
		},
		"/events/get": {
			Description: "Get a single event",
			Controller:  controller.Get[models.LeadTimelineEvent](),
		},
		"/events/create": {
			Description: "Create an event",
			Controller:  controller.Create[models.LeadTimelineEvent](),
		},
		"/events/update": {
			Description: "Update an event",
			Controller:  controller.Update[models.LeadTimelineEvent](models.LEAD_TIMELINE_EVENT_MODEL_NAME),
		},

		"/tasks": {
			Description: "List all tasks",
			Controller:  controller.List[models.LeadTask](models.LEAD_TASK_MODEL_NAME),
		},
		"/tasks/get": {
			Description: "Get a single task",
			Controller:  controller.Get[models.LeadTask](),
		},
		"/tasks/create": {
			Description: "Create a task",
			Controller:  controller.Create[models.LeadTask](),
		},
		"/tasks/update": {
			Description: "Update a task",
			Controller:  controller.Update[models.LeadTask](models.LEAD_TASK_MODEL_NAME),
		},

		"/campaigns": {
			Description: "List all campaigns",
			Controller:  controller.List[models.Campaign](models.CAMPAIGN_MODEL_NAME),
		},
		"/campaigns/get": {
			Description: "Get a single campaign",
			Controller:  controller.Get[models.Campaign](),
		},
		"/campaigns/create": {
			Description: "Create a campaign",
			Controller:  controller.Create[models.Campaign](),
		},
		"/campaigns/update": {
			Description: "Update a campaign",
			Controller:  controller.Update[models.Campaign](models.CAMPAIGN_MODEL_NAME),
		},

		"/referrals": {
			Description: "List all referrals",
			Controller:  controller.List[models.Referral](models.REFERRAL_MODEL_NAME),
		},
		"/referrals/get": {
			Description: "Get a single referral",
			Controller:  controller.Get[models.Referral](),
		},
		"/referrals/create": {
			Description: "Create a referral",
			Controller:  controller.Create[models.Referral](),
		},
		"/referrals/update": {
			Description: "Update a referral",
			Controller:  controller.Update[models.Referral](models.REFERRAL_MODEL_NAME),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
