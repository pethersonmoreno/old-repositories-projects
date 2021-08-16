package model

type SecretGroup struct {
	Id                string          `json:"id"`
	Title             string          `json:"title"`
	AllSecretsSummary []SecretSummary `json:"allSecretsSummary"`
}
