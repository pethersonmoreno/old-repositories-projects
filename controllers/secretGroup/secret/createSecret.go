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

type SecretItemToCreate struct {
	Login      string `json:"login"`
	Password   string `json:"password" binding:"required"`
	Annotation string `json:"annotation"`
}

type CreateSecret struct {
	Title string               `json:"title" binding:"required"`
	Url   string               `json:"url"`
	Items []SecretItemToCreate `json:"items" binding:"required"`
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
		"items": {
			"type": "array",
			"minItems": 1,
			"contains": {
				"type": "object",
				"properties": {
					"login": {
						"type": "string"
					},
					"password": {
						"type": "string"
					},
					"annotation": {
						"type": "string"
					}
				}
			}
		}
    },
    "required": ["title", "items"],
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
	updatedDate := time.Now()
	newSecret := model.SecretFull{
		Id:          uuid.NewString(),
		Title:       json.Title,
		Url:         json.Url,
		Items:       []model.SecretItem{},
		UpdatedDate: updatedDate,
	}
	newSecret.Items = []model.SecretItem{}
	for _, secretItemCreateOrUpdate := range json.Items {
		secretItem := model.SecretItem{
			Login:               secretItemCreateOrUpdate.Login,
			Password:            secretItemCreateOrUpdate.Password,
			PasswordUpdatedDate: updatedDate,
			Annotation:          secretItemCreateOrUpdate.Annotation,
		}
		newSecret.Items = append(newSecret.Items, secretItem)
	}
	err := io.WriteSecretFile(secretGroupId, intermediateKey, newSecret, openingKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"id": newSecret.Id})
}
