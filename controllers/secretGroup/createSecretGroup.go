package secretGroup

import (
	"net/http"
	"secretvault/io"
	"secretvault/model"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateSecretGroup struct {
	Title string `json:"title" binding:"required"`
}

var createSecretGroupSchema string = `
{
    "title": "Create Secret Group Schema",
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        }
    },
    "required": ["title"],
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
	err := io.WriteSecretGroupFile(newSecretGroup, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": newSecretGroup.Id})
}
