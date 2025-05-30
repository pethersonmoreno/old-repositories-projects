package secretGroup

import (
	"net/http"
	"secretvault/io"
	"secretvault/iokey"
	"secretvault/model"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateSecretGroup struct {
	Title           string `json:"title" binding:"required"`
	LocalKeyName    string `json:"localKeyName" binding:"required"`
	TransferKeyName string `json:"transferKeyName" binding:"required"`
}

var createSecretGroupSchema string = `
{
    "title": "Create Secret Group Schema",
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "localKeyName": {
            "type": "string"
        },
        "transferKeyName": {
            "type": "string"
        }
    },
    "required": ["title","localKeyName","transferKeyName"],
	"additionalProperties": false
}`

func createSecretGroupHandler(ctx *gin.Context) {
	json := CreateSecretGroup{}
	if err := schema.BindJSON(ctx, createSecretGroupSchema, &json); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, hasIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	intermediateKey := ctx.Request.Header.Get("Intermediate-Key")
	newSecretGroup := model.SecretGroup{
		Id:                uuid.NewString(),
		Title:             json.Title,
		AllSecretsSummary: []model.SecretSummary{},
	}
	localKey, err := iokey.ReadKeyFileByName(json.LocalKeyName)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	transferKey := localKey
	if json.TransferKeyName != json.LocalKeyName {
		transferKey, err = iokey.ReadKeyFileByName(json.TransferKeyName)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}
	localKey.LocalSecretGroupIds = append(localKey.LocalSecretGroupIds, newSecretGroup.Id)
	err = iokey.WriteKeyFile(*localKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	transferKey.TransferSecretGroupIds = append(transferKey.TransferSecretGroupIds, newSecretGroup.Id)
	err = iokey.WriteKeyFile(*transferKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = io.WriteSecretGroupFile(newSecretGroup, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": newSecretGroup.Id})
}
