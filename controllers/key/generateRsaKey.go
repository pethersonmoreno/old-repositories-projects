package key

import (
	"net/http"
	"secretvault/crypto"

	schema "github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
)

type GenerateRsaKey struct {
	Bits int `json:"bits" binding:"required"`
}

var generateRsaKeySchema string = `
{
    "title": "Update Intermediate Key Schema",
    "type": "object",
    "properties": {
        "bits": {
            "type": "integer"
        }
    },
    "required": ["bits"],
	"additionalProperties": false
}`

func generateRsaKeyHandler(ctx *gin.Context) {
	json := GenerateRsaKey{}
	if err := schema.BindJSON(ctx, generateRsaKeySchema, &json); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	privKeyStr, err := crypto.GenerateRsaKey(json.Bits)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"key": *privKeyStr})
}
