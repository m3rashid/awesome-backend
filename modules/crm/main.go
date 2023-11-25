package crm

import (
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
	Resources: module.Resources{
		models.LEAD_MODEL_NAME: models.ResourceIndex{
			NameKey:        "name",
			DescriptionKey: "notes",
		},
		models.LEAD_TASK_MODEL_NAME: models.ResourceIndex{
			NameKey: "note",
		},
		models.REFERRAL_MODEL_NAME: models.ResourceIndex{
			NameKey:        "code",
			DescriptionKey: "description",
		},
		models.CAMPAIGN_MODEL_NAME: models.ResourceIndex{
			NameKey:        "name",
			DescriptionKey: "description",
		},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
