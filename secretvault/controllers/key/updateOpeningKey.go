package key

import (
	"io/ioutil"
	"net/http"
	"secretvault/io"
	"strings"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
)

type UpdateOpeningKey struct {
	OpeningKey string `json:"openingKey" binding:"required"`
}

var updateOpeningKeySchema string = `
{
    "title": "Update Intermediate Key Schema",
    "type": "object",
    "properties": {
        "openingKey": {
            "type": "string"
        }
    },
    "required": ["openingKey"],
	"additionalProperties": false
}`

func updateOpeningKeyHandler(ctx *gin.Context) {
	json := UpdateOpeningKey{}
	if err := schema.BindJSON(ctx, updateOpeningKeySchema, &json); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, hasIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	intermediateKey := ctx.Request.Header.Get("Intermediate-Key")
	_, hasOldOpeningKey := ctx.Request.Header["Opening-Key"]
	if !hasOldOpeningKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Opening-Key is required"})
		return
	}
	oldOpeningKey := ctx.Request.Header.Get("Opening-Key")
	listDir, err := ioutil.ReadDir(".")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	listSecretGroupIds := []string{}
	for _, file := range listDir {
		directoryName := file.Name()
		const prefix = "secretGroup-"
		if file.IsDir() && strings.HasPrefix(directoryName, prefix) {
			secretGroupId := strings.TrimPrefix(directoryName, prefix)
			listSecretGroupIds = append(listSecretGroupIds, secretGroupId)
		}
	}
	for _, secretGroupId := range listSecretGroupIds {
		secretGroup, err := io.ReadSecretGroupFile(secretGroupId, intermediateKey)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		for _, secretSummary := range secretGroup.AllSecretsSummary {
			secretItems, err := io.ReadOnlySecretFile(secretGroup.Id, secretSummary.Id, oldOpeningKey)
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			err = io.WriteOnlySecretFile(secretGroup.Id, secretSummary.Id, secretItems, json.OpeningKey)
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
		}
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "Opening Key Updated"})
}
