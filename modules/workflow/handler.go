package workflow

import (
	"awesome/models"
	"awesome/utils"
	"log"
)

const MAX_RETRIES = 3

func RunWorkflowHub() {
	for {
		select {
		case flow := <-models.Flows:
			HandleWorkflow(flow)
		}
	}
}

func onError(flow models.WorkflowAction) {
	newFlow := models.WorkflowAction{
		TriggerModel:  flow.TriggerModel,
		TriggerAction: flow.TriggerAction,
		TenantUrl:     flow.TenantUrl,
		ObjectID:      flow.ObjectID,
		RetryIndex:    flow.RetryIndex + 1,
	}
	models.Flows <- newFlow
}

func HandleWorkflow(flow models.WorkflowAction) {
	if flow.RetryIndex >= MAX_RETRIES {
		return
	}

	db, err := utils.GetTenantDB(flow.TenantUrl)
	if err != nil {
		log.Println(err)
		onError(flow)
		return
	}

	var workflow models.WorkflowTemplate
	err = db.Preload("Steps").Where(map[string]interface{}{
		"triggerModel":  flow.TriggerModel,
		"triggerAction": flow.TriggerAction,
	}).First(&workflow).Error
	if err != nil {
		log.Println(err)
		onError(flow)
		return
	}

	if workflow.ID == 0 {
		log.Println("No workflow found")
		return
	}

	var data map[string]interface{}
	err = db.Table(flow.TriggerModel).Where("id = ?", flow.ObjectID).First(&data).Error
	if err != nil || data == nil {
		log.Println(err)
		onError(flow)
		return
	}

	newWorkflow := models.Workflow{
		Data:       data,
		TemplateID: workflow.ID,
		Template:   &workflow,
	}

	err = db.Create(&newWorkflow).Error
	if err != nil {
		log.Println(err)
		onError(flow)
		return
	}

	for _, step := range workflow.Steps {
		log.Println("running", step)
	}
	log.Println("Workflow Completed")
}
