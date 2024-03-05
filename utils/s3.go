package utils

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	v4 "github.com/aws/aws-sdk-go-v2/aws/signer/v4"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

var _s3Client *s3.Client

func getS3Client() *s3.Client {
	if _s3Client == nil {
		config, err := config.LoadDefaultConfig(context.TODO())
		if err != nil {
			log.Fatal(err)
		}
		_s3Client = s3.NewFromConfig(config)
	}

	return _s3Client
}

type Presigner struct {
	PresignClient *s3.PresignClient
}

func NewPresigner() Presigner {
	s3Client := getS3Client()
	return Presigner{
		PresignClient: s3.NewPresignClient(s3Client),
	}
}

func (presigner Presigner) GetObject(
	bucketName string,
	objectKey string,
	lifetimeSecs int64,
) (*v4.PresignedHTTPRequest, error) {
	request, err := presigner.PresignClient.PresignGetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(lifetimeSecs * int64(time.Second))
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to get %v:%v. %v\n", bucketName, objectKey, err)
	}

	return request, err
}

func (presigner Presigner) PutObject(
	bucketName string,
	objectKey string,
	lifetimeSecs int64,
) (*v4.PresignedHTTPRequest, error) {
	request, err := presigner.PresignClient.PresignPutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(lifetimeSecs * int64(time.Second))
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to put %v:%v. %v\n", bucketName, objectKey, err)
	}

	return request, err
}

func (presigner Presigner) DeleteObject(
	bucketName string,
	objectKey string,
) (*v4.PresignedHTTPRequest, error) {
	request, err := presigner.PresignClient.PresignDeleteObject(context.TODO(), &s3.DeleteObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to delete %v. %v\n", objectKey, err)
	}

	return request, err
}

func CreateBucket(name string) error {
	s3Client := getS3Client()
	_, err := s3Client.CreateBucket(context.TODO(), &s3.CreateBucketInput{
		Bucket: aws.String(name),
		CreateBucketConfiguration: &types.CreateBucketConfiguration{
			LocationConstraint: types.BucketLocationConstraint(os.Getenv("AWS_REGION")),
		},
	})
	if err != nil {
		log.Printf("Couldn't create bucket %v. %v\n", name, err)
	}

	return err
}
