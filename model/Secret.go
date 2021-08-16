package model

import "time"

type Secret struct {
	Id                  string    `json:"id"`
	Title               string    `json:"title"`
	Url                 string    `json:"url"`
	Login               string    `json:"login"`
	Password            string    `json:"password"`
	Annotation          string    `json:"annotation"`
	PasswordUpdatedDate time.Time `json:"passwordUpdatedDate"`
	UpdatedDate         time.Time `json:"updatedDate"`
}
