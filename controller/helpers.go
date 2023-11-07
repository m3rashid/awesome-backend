package controller

const SKIP_VALIDATION_KEY = "skipValidation"
const CREATED_AT_FIELD = "created_at"
const UPDATED_AT_FIELD = "updated_at"

type PaginationOptions struct {
	Limit int64 `json:"limit"`
	Page  int64 `json:"page"`
}

type PaginationResponse[T interface{}] struct {
	Docs            []T   `json:"docs"`
	Count           int64 `json:"count"`
	Limit           int64 `json:"limit"`
	TotalDocs       int64 `json:"totalDocs"`
	CurrentPage     int64 `json:"currentPage"`
	HasNextPage     bool  `json:"hasNextPage"`
	HasPreviousPage bool  `json:"hasPreviousPage"`
}

type ListBody struct {
	SearchCriteria    map[string]interface{} `json:"searchCriteria"`
	PaginationOptions PaginationOptions      `json:"paginationOptions"`
}

type UpdateBody struct {
	SearchCriteria map[string]interface{} `json:"searchCriteria"`
	Update         map[string]interface{} `json:"update"`
}
