package secret

import (
	"net/http"
	"secretvault/io"

	"github.com/gin-gonic/gin"
)

func getSecretByIdHandler(ctx *gin.Context) {
	secretGroupId := ctx.Param("secretGroupId")
	secretId := ctx.Param("secretId")
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
	secretFound, err := io.ReadSecretFile(secretGroupId, intermediateKey, secretId, openingKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if secretFound == nil {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "Secret not found"})
		return
	}
	ctx.JSON(http.StatusOK, secretFound)
}
