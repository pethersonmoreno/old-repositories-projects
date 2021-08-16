package secret

import (
	"net/http"
	"secretvault/io"
	"time"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
)

var updateSecretSchema string = `
{
    "title": "Update Secret Schema",
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
    "required": [],
	"additionalProperties": false
}`

type UpdateSecret struct {
	Title      *string `json:"title"`
	Url        *string `json:"url"`
	Login      *string `json:"login"`
	Password   *string `json:"password"`
	Annotation *string `json:"annotation"`
}

func partialUpdateSecretByIdHandler(ctx *gin.Context) {
	secretGroupId := ctx.Param("secretGroupId")
	secretId := ctx.Param("secretId")
	json := UpdateSecret{}
	if err := schema.BindJSON(ctx, updateSecretSchema, &json); err != nil {
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
	secretToUpdate, err := io.ReadSecretFile(secretGroupId, secretId, openingKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if secretToUpdate == nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "Secret not found"})
		return
	}
	secretUpdated := false
	updatedDate := time.Now()
	if json.Title != nil {
		secretUpdated = true
		secretToUpdate.Title = *json.Title
	}
	if json.Url != nil {
		secretUpdated = true
		secretToUpdate.Url = *json.Url
	}
	if json.Login != nil {
		secretUpdated = true
		secretToUpdate.Login = *json.Login
	}
	if json.Password != nil {
		secretUpdated = true
		secretToUpdate.Password = *json.Password
		secretToUpdate.PasswordUpdatedDate = updatedDate
	}
	if json.Annotation != nil {
		secretUpdated = true
		secretToUpdate.Annotation = *json.Annotation
	}
	if !secretUpdated {
		ctx.JSON(http.StatusOK, gin.H{"status": "Secret unchanged"})
	}
	secretToUpdate.UpdatedDate = time.Now()
	secretGroup, err := io.ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for _, secretSummary := range secretGroup.AllSecretsSummary {
		secretSummary.Title = secretToUpdate.Title
		secretSummary.Url = secretToUpdate.Url
		secretSummary.PasswordUpdatedDate = secretToUpdate.PasswordUpdatedDate
		secretSummary.UpdatedDate = secretToUpdate.UpdatedDate
	}
	err = io.WriteSecretFile(secretGroupId, *secretToUpdate, openingKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = io.WriteSecretGroupFile(*secretGroup, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "Secret updated"})
}
