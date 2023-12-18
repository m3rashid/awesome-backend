package workflow

import (
	"log"

	"github.com/m3rashid/awesome/models"
)

func RunWorkflowHub() {
	for {
		select {
		case flow := <-models.Flows:
			log.Println("flow received", flow)
		}
	}
}
