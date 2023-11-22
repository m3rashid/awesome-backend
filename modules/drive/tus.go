package drive

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	tusd "github.com/tus/tusd/v2/pkg/handler"
	"github.com/tus/tusd/v2/pkg/s3store"
)

func GetTusHandler(app *fiber.App) *tusd.UnroutedHandler {
	uploadPath, err := filepath.Abs("public/uploads")
	if err != nil {
		panic(fmt.Errorf("unable to get absolute path for uploads directory: %s", err))
	}

	store := s3store.S3Store{
		Bucket:             os.Getenv("AWS_s3_BUCKET_NAME"),
		TemporaryDirectory: uploadPath,
		Service:            s3Client(),
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	tusdHandler, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath:              "/api/drive/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
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
