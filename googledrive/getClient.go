package googledrive

import (
	"context"
	"net/http"

	"golang.org/x/oauth2"
)

func getClient(token oauth2.Token) (*http.Client, error) {
	config, err := GetConfig()
	if err != nil {
		return nil, err
	}
	return config.Client(context.Background(), &token), nil
}
