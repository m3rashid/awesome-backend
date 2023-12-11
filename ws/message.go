package ws

import "encoding/json"

type ActionType string

const (
	CommunityChat ActionType = "community_chat"
)

type MessageFormat struct {
	Token      string      `json:"token"`
	Data       interface{} `json:"data"`
	ActionType ActionType  `json:"actionType"`
}

func (m *MessageFormat) UnmarshalJSON(b []byte) error {
	var msg MessageFormat
	err := json.Unmarshal(b, &msg)
	if err != nil {
		return err
	}
	return nil
}
