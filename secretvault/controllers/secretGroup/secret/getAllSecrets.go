package secret

import (
	"net/http"
	"secretvault/io"

	"github.com/gin-gonic/gin"
)

func getAllSecretsHandler(ctx *gin.Context) {
	secretGroupId := ctx.Param("secretGroupId")
	_, hasIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	intermediateKey := ctx.Request.Header.Get("Intermediate-Key")
	secretGroup, err := io.ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, secretGroup.AllSecretsSummary)
}
