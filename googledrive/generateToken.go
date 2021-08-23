package googledrive

import (
	"context"

	"golang.org/x/oauth2"
)

func GenerateUrlToGetAuthCode() (*string, error) {
	config, err := GetConfig()
	if err != nil {
		return nil, err
	}
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	return &authURL, err
}

func GenerateTokenWithAuthCode(authCode string) (*oauth2.Token, error) {
	config, err := GetConfig()
	if err != nil {
		return nil, err
	}
	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		return nil, err
	}
	return tok, nil
}
