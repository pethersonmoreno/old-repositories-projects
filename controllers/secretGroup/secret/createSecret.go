package secret

import (
	"net/http"
	"secretvault/io"
	"secretvault/model"
	"time"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateSecret struct {
	Title      string `json:"title" binding:"required"`
	Url        string `json:"url"`
	Login      string `json:"login"`
	Password   string `json:"password" binding:"required"`
	Annotation string `json:"annotation"`
}

var createSecretSchema string = `
{
    "title": "Create Secret Schema",
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "url": {
            "type": "string"
        },
        "login": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "annotation": {
            "type": "string"
        }
    },
    "required": ["title", "password"],
	"additionalProperties": false
}`

func createSecretHandler(ctx *gin.Context) {
	secretGroupId := ctx.Param("secretGroupId")
	json := CreateSecret{}
	if err := schema.BindJSON(ctx, createSecretSchema, &json); err != nil {
		return
	}
	_, hasIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	intermediateKey := ctx.Request.Header.Get("Intermediate-Key")
	_, hasOpeningKey := ctx.Request.Header["Opening-Key"]
	if !hasOpeningKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Opening-Key is required"})
		return
	}
	openingKey := ctx.Request.Header.Get("Opening-Key")
	newSecret := model.Secret{
		Id:                  uuid.NewString(),
		Title:               json.Title,
		Url:                 json.Url,
		Login:               json.Login,
		Password:            json.Password,
		Annotation:          json.Annotation,
		PasswordUpdatedDate: time.Now(),
		UpdatedDate:         time.Now(),
	}
	secretSummary := model.SecretSummary{
		Id:                  newSecret.Id,
		Title:               newSecret.Title,
		Url:                 newSecret.Url,
		PasswordUpdatedDate: newSecret.PasswordUpdatedDate,
		UpdatedDate:         newSecret.UpdatedDate,
	}
	secretGroup, err := io.ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	secretGroup.AllSecretsSummary = append(secretGroup.AllSecretsSummary, secretSummary)
	err = io.WriteSecretFile(secretGroupId, newSecret, openingKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = io.WriteSecretGroupFile(*secretGroup, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": newSecret.Id})
}
