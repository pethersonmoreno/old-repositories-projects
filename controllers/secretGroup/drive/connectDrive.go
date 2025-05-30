package drive

import (
	"net/http"
	"secretvault/googledrive"
	"secretvault/io"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
)

type ConnectDrive struct {
	AuthorizationCode string `json:"authorizationCode"`
	Force             bool   `json:"force"`
}

var connectDriveSchema string = `
{
    "title": "Connect Secret Group with Google Drive Schema",
    "type": "object",
    "properties": {
        "authorizationCode": {
            "type": "string"
        },
        "force": {
            "type": "boolean"
        }
    },
    "required": [],
	"additionalProperties": false
}`

func connectDriveHandler(ctx *gin.Context) {
	secretGroupId := ctx.Param("secretGroupId")
	json := ConnectDrive{}
	if err := schema.BindJSON(ctx, connectDriveSchema, &json); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, hasIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	intermediateKey := ctx.Request.Header.Get("Intermediate-Key")
	secretGroup, err := io.ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if secretGroup.GoogleToken != nil && json.Force != true {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Secret Group already connected with Google Drive"})
		return

	}
	if json.AuthorizationCode == "" {
		urlToGetAuthCode, err := googledrive.GenerateUrlToGetAuthCode()
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"url": urlToGetAuthCode})
		return
	}
	token, err := googledrive.GenerateTokenWithAuthCode(json.AuthorizationCode)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	secretGroup.GoogleToken = token
	err = io.WriteSecretGroupFile(*secretGroup, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.Status(http.StatusOK)
}
