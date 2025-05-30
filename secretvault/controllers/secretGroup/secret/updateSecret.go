package secret

import (
	"net/http"
	"secretvault/io"
	"secretvault/model"
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
    "required": [],
	"additionalProperties": false
}`

type SecretItemToCreateOrUpdate struct {
	Login      string `json:"login"`
	Password   string `json:"password" binding:"required"`
	Annotation string `json:"annotation"`
}

type UpdateSecret struct {
	Title *string                      `json:"title"`
	Url   *string                      `json:"url"`
	Items []SecretItemToCreateOrUpdate `json:"items"`
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
	secretToUpdate, err := io.ReadSecretFile(secretGroupId, intermediateKey, secretId, openingKey)
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
	if json.Items != nil {
		secretUpdated = true
		secretToUpdate.Items = []model.SecretItem{}
		for _, secretItemCreateOrUpdate := range json.Items {
			secretItem := model.SecretItem{
				Login:               secretItemCreateOrUpdate.Login,
				Password:            secretItemCreateOrUpdate.Password,
				PasswordUpdatedDate: updatedDate,
				Annotation:          secretItemCreateOrUpdate.Annotation,
			}
			secretToUpdate.Items = append(secretToUpdate.Items, secretItem)
		}
	}
	if !secretUpdated {
		ctx.JSON(http.StatusOK, gin.H{"status": "Secret unchanged"})
		return
	}
	secretToUpdate.UpdatedDate = time.Now()
	err = io.WriteSecretFile(secretGroupId, intermediateKey, *secretToUpdate, openingKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "Secret updated"})
}
