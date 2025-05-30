package model

type KeyListItem struct {
	Id                     string   `json:"id"`
	Name                   string   `json:"name"`
	LocalSecretGroupIds    []string `json:"localSecretGroupIds"`
	TransferSecretGroupIds []string `json:"transferSecretGroupIds"`
}
