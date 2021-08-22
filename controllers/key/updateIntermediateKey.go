package key

import (
	"io/ioutil"
	"net/http"
	"secretvault/io"
	"strings"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
)

type UpdateIntermediateKey struct {
	IntermediateKey string `json:"intermediateKey" binding:"required"`
}

var updateIntermediateKeySchema string = `
{
    "title": "Update Intermediate Key Schema",
    "type": "object",
    "properties": {
        "intermediateKey": {
            "type": "string"
        }
    },
    "required": ["intermediateKey"],
	"additionalProperties": false
}`

func updateIntermediateKeyHandler(ctx *gin.Context) {
	json := UpdateIntermediateKey{}
	if err := schema.BindJSON(ctx, updateIntermediateKeySchema, &json); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, hasOldIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasOldIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	oldIntermediateKey := ctx.Request.Header.Get("Intermediate-Key")
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
		secretGroup, err := io.ReadSecretGroupFile(secretGroupId, oldIntermediateKey)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err = io.WriteSecretGroupFile(*secretGroup, json.IntermediateKey)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "Intermediate Key Updated"})
}
