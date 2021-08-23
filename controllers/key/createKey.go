package key

import (
	"net/http"
	"secretvault/iokey"
	"secretvault/model"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateKey struct {
	Name string `json:"name" binding:"required"`
	Key  string `json:"key" binding:"required"`
}

var createKeySchema string = `
{
    "title": "Create Key Schema",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "key": {
            "type": "string"
        }
    },
    "required": ["name","key"],
	"additionalProperties": false
}`

func createKeyHandler(ctx *gin.Context) {
	json := CreateKey{}
	if err := schema.BindJSON(ctx, createKeySchema, &json); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	newKey := model.Key{
		Id:   uuid.NewString(),
		Name: json.Name,
		Key:  json.Key,
	}
	err := iokey.WriteKeyFile(newKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"id": newKey.Id})
}
