package googledrive

import (
	"io/ioutil"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v2"
)

var config *oauth2.Config = nil

func GetConfig() (*oauth2.Config, error) {
	if config != nil {
		return config, nil
	}
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		return nil, err
	}
	config, err = google.ConfigFromJSON(b, drive.DriveScope)
	if err != nil {
		return nil, err
	}
	return config, nil
}
