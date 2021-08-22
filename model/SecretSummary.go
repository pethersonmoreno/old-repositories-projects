package model

import "time"

type SecretSummary struct {
	Id          string    `json:"id"`
	Title       string    `json:"title"`
	Url         string    `json:"url"`
	UpdatedDate time.Time `json:"updatedDate"`
}
