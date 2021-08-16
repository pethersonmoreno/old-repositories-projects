package io

import (
	"os"
	"path"
	"secretvault/crypto"
	"secretvault/model"
)

func getSecretFilenameById(secretGroupId string, secretId string) string {
	secretGroupDirectoryName := getSecretGroupDirectoryNameById(secretGroupId)
	filenameSecret := path.Join(secretGroupDirectoryName, "secret-"+secretId+".data")
	return filenameSecret
}

func ReadSecretFile(secretGroupId string, secretId string, openingKey string) (*model.Secret, error) {
	secretFilename := getSecretFilenameById(secretGroupId, secretId)
	if _, err := os.Stat(secretFilename); os.IsNotExist(err) {
		return nil, nil
	}
	encryptedSecretDataBytes, err := os.ReadFile(secretFilename)
	if err != nil {
		return nil, err
	}
	encryptedSecretData := string(encryptedSecretDataBytes)
	secret, err := crypto.DecryptSecret(openingKey, encryptedSecretData)
	if err != nil {
		return nil, err
	}
	return secret, nil
}

func RemoveSecretFile(secretGroupId string, secretId string) error {
	secretFilename := getSecretFilenameById(secretGroupId, secretId)
	if _, err := os.Stat(secretFilename); os.IsNotExist(err) {
		return nil
	}
	return os.Remove(secretFilename)
}

func WriteSecretFile(secretGroupId string, secret model.Secret, openingKey string) error {
	encryptedSecretData, err := crypto.EncryptSecret(openingKey, secret)
	if err != nil {
		return err
	}
	secretFilename := getSecretFilenameById(secretGroupId, secret.Id)
	err = os.WriteFile(secretFilename, []byte(*encryptedSecretData), 0600)
	return err
}
