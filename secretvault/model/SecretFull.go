package model

import "time"

type SecretFull struct {
	Id          string       `json:"id"`
	Title       string       `json:"title"`
	Url         string       `json:"url"`
	Items       []SecretItem `json:"items"`
	UpdatedDate time.Time    `json:"updatedDate"`
}
