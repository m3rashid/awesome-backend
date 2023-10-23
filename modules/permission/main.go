package permission

import search "github.com/m3rashid/awesome/modules/search/schema"

type Permission = map[string]struct {
	Level int `json:"level"`
	Scope int `json:"scope"`
}

type ModulePermission struct {
	Name                   string               `json:"name"`
	ResourceType           string               `json:"resourceType"`
	ResourceIndex          search.ResourceIndex `json:"resourceIndex"`
	ActionPermissions      Permission           `json:"actionPermissions"`
	IndependentPermissions Permission           `json:"independentPermissions"`
}
