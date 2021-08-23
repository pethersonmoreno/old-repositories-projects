package io

import (
	"errors"
	"os"
	"path"
	"secretvault/crypto"
	"secretvault/model"
	"sort"
)

func getSecretFilenameById(secretGroupId string, secretId string) string {
	secretGroupDirectoryName := getSecretGroupDirectoryNameById(secretGroupId)
	filenameSecret := path.Join(secretGroupDirectoryName, "secret-"+secretId+".data")
	return filenameSecret
}

func GetSecretSummaryFromSecretGroup(secretGroup model.SecretGroup, secretId string) *model.SecretSummary {
	sizeSecrets := len(secretGroup.AllSecretsSummary)
	indexSecret := sort.Search(sizeSecrets, func(index int) bool {
		itemSecret := secretGroup.AllSecretsSummary[index]
		return itemSecret.Id == secretId
	})
	if indexSecret == sizeSecrets {
		return nil
	}
	return &secretGroup.AllSecretsSummary[indexSecret]
}

func ReadSecretFile(secretGroupId string, intermediateKey string, secretId string, openingKey string) (*model.SecretFull, error) {
	secretGroup, err := ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		return nil, err
	}
	secretSummary := GetSecretSummaryFromSecretGroup(*secretGroup, secretId)
	if secretSummary == nil {
		return nil, errors.New("not found secret summary")
	}
	secretFilename := getSecretFilenameById(secretGroupId, secretId)
	if _, err := os.Stat(secretFilename); os.IsNotExist(err) {
		return nil, nil
	}
	encryptedSecretDataBytes, err := os.ReadFile(secretFilename)
	if err != nil {
		return nil, err
	}
	encryptedSecretData := string(encryptedSecretDataBytes)
	secretItems, err := crypto.DecryptSecret(secretGroupId, openingKey, encryptedSecretData)
	if err != nil {
		return nil, err
	}
	secretFull := model.SecretFull{
		Id:          secretSummary.Id,
		Title:       secretSummary.Title,
		Url:         secretSummary.Url,
		Items:       secretItems,
		UpdatedDate: secretSummary.UpdatedDate,
	}
	return &secretFull, nil
}

func RemoveSecretFile(secretGroupId string, intermediateKey string, secretId string) error {
	secretFilename := getSecretFilenameById(secretGroupId, secretId)
	if _, err := os.Stat(secretFilename); os.IsNotExist(err) {
		return errors.New("secret not found")
	}
	secretGroup, err := ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		return err
	}
	sizeSecrets := len(secretGroup.AllSecretsSummary)
	indexSecret := sort.Search(sizeSecrets, func(index int) bool {
		itemSecret := secretGroup.AllSecretsSummary[index]
		return itemSecret.Id == secretId
	})
	if indexSecret == sizeSecrets {
		return errors.New("secret not found")
	}
	secretGroup.AllSecretsSummary = append(secretGroup.AllSecretsSummary[:indexSecret], secretGroup.AllSecretsSummary[indexSecret+1:]...)
	err = os.Remove(secretFilename)
	if err != nil {
		return err
	}
	err = WriteSecretGroupFile(*secretGroup, intermediateKey)
	return err
}

func WriteSecretFile(secretGroupId string, intermediateKey string, secretFull model.SecretFull, openingKey string) error {
	secretGroup, err := ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		return err
	}
	secretSummaryFound := GetSecretSummaryFromSecretGroup(*secretGroup, secretFull.Id)
	if secretSummaryFound != nil {
		secretSummaryFound.Id = secretFull.Id
		secretSummaryFound.Title = secretFull.Title
		secretSummaryFound.Url = secretFull.Url
		secretSummaryFound.UpdatedDate = secretFull.UpdatedDate
	} else {
		secretSummary := model.SecretSummary{
			Id:          secretFull.Id,
			Title:       secretFull.Title,
			Url:         secretFull.Url,
			UpdatedDate: secretFull.UpdatedDate,
		}
		secretGroup.AllSecretsSummary = append(secretGroup.AllSecretsSummary, secretSummary)
	}
	encryptedSecretData, err := crypto.EncryptSecret(secretGroup.Id, openingKey, secretFull.Items)
	if err != nil {
		return err
	}
	secretFilename := getSecretFilenameById(secretGroupId, secretFull.Id)
	err = os.WriteFile(secretFilename, []byte(*encryptedSecretData), 0600)
	if err != nil {
		return err
	}
	err = WriteSecretGroupFile(*secretGroup, intermediateKey)
	return err
}

func ReadOnlySecretFile(secretGroupId string, secretId string, openingKey string) ([]model.SecretItem, error) {
	secretFilename := getSecretFilenameById(secretGroupId, secretId)
	if _, err := os.Stat(secretFilename); os.IsNotExist(err) {
		return nil, nil
	}
	encryptedSecretDataBytes, err := os.ReadFile(secretFilename)
	if err != nil {
		return nil, err
	}
	encryptedSecretData := string(encryptedSecretDataBytes)
	secretItems, err := crypto.DecryptSecret(secretGroupId, openingKey, encryptedSecretData)
	if err != nil {
		return nil, err
	}
	return secretItems, nil
}

func WriteOnlySecretFile(secretGroupId string, secretId string, secretItems []model.SecretItem, openingKey string) error {
	encryptedSecretData, err := crypto.EncryptSecret(secretGroupId, openingKey, secretItems)
	if err != nil {
		return err
	}
	secretFilename := getSecretFilenameById(secretGroupId, secretId)
	err = os.WriteFile(secretFilename, []byte(*encryptedSecretData), 0600)
	return err
}
