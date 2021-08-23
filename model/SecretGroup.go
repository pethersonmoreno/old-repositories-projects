package model

import "golang.org/x/oauth2"

type SecretGroup struct {
	Id                string          `json:"id"`
	Title             string          `json:"title"`
	AllSecretsSummary []SecretSummary `json:"allSecretsSummary"`
	GoogleToken       *oauth2.Token   `json:"googleToken"`
}
