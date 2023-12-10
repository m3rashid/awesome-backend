package controller

const SKIP_VALIDATION_KEY = "skipValidation"
const CREATED_AT_FIELD = "createdAt"
const UPDATED_AT_FIELD = "updatedAt"

type PaginationOptions struct {
	Limit int `json:"limit"`
	Page  int `json:"page"`
}

type PaginationResponse[T interface{}] struct {
	Docs            []T   `json:"docs"`
	Count           int   `json:"count"`
	Limit           int   `json:"limit"`
	TotalDocs       int64 `json:"totalDocs"`
	CurrentPage     int   `json:"currentPage"`
	HasNextPage     bool  `json:"hasNextPage"`
	HasPreviousPage bool  `json:"hasPreviousPage"`
}

type ListBody struct {
	Populate          []string               `json:"populate"`
	SearchCriteria    map[string]interface{} `json:"searchCriteria"`
	PaginationOptions PaginationOptions      `json:"paginationOptions"`
}

type UpdateBody struct {
	SearchCriteria map[string]interface{} `json:"searchCriteria"`
	Update         map[string]interface{} `json:"update"`
	ResourceIndex  ResourceIndex          `json:"resourceIndex" validate:""`
}

type GetBody[T interface{}] struct {
	SearchCriteria T        `json:"searchCriteria"`
	Populate       []string `json:"populate"`
}

type CreatedDBResponse struct {
	ID uint `json:"id"`
}

type ResourceIndex struct {
	Name         string `json:"name" validate:"required"`
	Description  string `json:"description" validate:""`
	ResourceType string `json:"resourceType" validate:"required"`
}

type CreateRequestBody[T interface{}] struct {
	Body          T             `json:"body" validate:"required"`
	ResourceIndex ResourceIndex `json:"resourceIndex" validate:""`
}
