package secretGroup

import (
	"io/ioutil"
	"net/http"
	"secretvault/io"
	"secretvault/model"
	"strings"

	"github.com/gin-gonic/gin"
)

func getAllSecretGroupsHandler(ctx *gin.Context) {
	_, hasIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	intermediateKey := ctx.Request.Header.Get("Intermediate-Key")
	listDir, err := ioutil.ReadDir(".")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	listSecretGroupIds := []string{}
	for _, file := range listDir {
		directoryName := file.Name()
		const prefix = "secretGroup-"
		if file.IsDir() && strings.HasPrefix(directoryName, prefix) {
			secretGroupId := strings.TrimPrefix(directoryName, prefix)
			listSecretGroupIds = append(listSecretGroupIds, secretGroupId)
		}
	}
	listSecretGroups := []model.SecretGroupSummary{}
	for _, secretGroupId := range listSecretGroupIds {
		secretGroup, err := io.ReadSecretGroupFile(secretGroupId, intermediateKey)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		secretGroupSummary := model.SecretGroupSummary{
			Id:    secretGroup.Id,
			Title: secretGroup.Title,
		}
		listSecretGroups = append(listSecretGroups, secretGroupSummary)
	}
	ctx.JSON(http.StatusOK, listSecretGroups)
}
