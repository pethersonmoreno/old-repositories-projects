package model

import "time"

type SecretItem struct {
	Login               string    `json:"login"`
	Password            string    `json:"password"`
	PasswordUpdatedDate time.Time `json:"passwordUpdatedDate"`
	Annotation          string    `json:"annotation"`
}
