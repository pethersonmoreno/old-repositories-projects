package googledrive

import (
	"golang.org/x/oauth2"
	"google.golang.org/api/drive/v2"
	"google.golang.org/api/option"
)

func GetDriveService(token oauth2.Token) (*drive.Service, error) {
	client, err := getClient(token)
	if err != nil {
		return nil, err
	}
	ctx := getContext()
	return drive.NewService(ctx, option.WithHTTPClient(client))
}
