package models

type Credentials struct {
	BaseModel
	OwnerID               uint
	Owner                 *User
	CredentialKey         string
	CredentialHashedValue string
}
