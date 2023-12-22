package drive

import (
	"fmt"
	"path/filepath"
	"regexp"

	"github.com/gofiber/fiber/v2"
	"github.com/tus/tusd/v2/pkg/filestore"
	tusd "github.com/tus/tusd/v2/pkg/handler"
)

func GetTusHandler(app *fiber.App) *tusd.UnroutedHandler {
	uploadPath, err := filepath.Abs("public/uploads")
	if err != nil {
		panic(fmt.Errorf("unable to get absolute path for uploads directory: %s", err))
	}

	// store := s3store.New(os.Getenv("AWS_S3_BUCKET_NAME"), s3Client())
	store := filestore.New(uploadPath)

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	allOrigin := regexp.MustCompile(`.*`)
	tusdHandler, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath:              "/api/files/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
		Cors: &tusd.CorsConfig{
			AllowOrigin: allOrigin,
		},
	})

	if err != nil {
		panic(fmt.Errorf("unable to create handler: %s", err))
	}

	go func() {
		for {
			event := <-tusdHandler.CompleteUploads
			fmt.Printf("Upload %s finished\n", event.Upload.ID)
		}
	}()

	return tusdHandler
}
