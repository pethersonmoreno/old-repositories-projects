package model

type Key struct {
	Id                     string   `json:"id"`
	Name                   string   `json:"name"`
	Key                    string   `json:"key"`
	LocalSecretGroupIds    []string `json:"localSecretGroupIds"`
	TransferSecretGroupIds []string `json:"transferSecretGroupIds"`
}
