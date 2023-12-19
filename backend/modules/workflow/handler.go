package workflow

import (
	"log"

	"awesome/models"
)

func RunWorkflowHub() {
	for {
		select {
		case flow := <-models.Flows:
			log.Println("flow received", flow)
		}
	}
}
