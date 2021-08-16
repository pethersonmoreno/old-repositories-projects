package io

import (
	"os"
	"path"
	"secretvault/crypto"
	"secretvault/model"
)

func getSecretGroupDirectoryNameById(secretGroupId string) string {
	return "secretGroup-" + secretGroupId
}

func getSecretGroupFilenameById(secretGroupId string) string {
	secretGroupDirectoryName := getSecretGroupDirectoryNameById(secretGroupId)
	filenameSecretGroup := path.Join(secretGroupDirectoryName, "secretGroup.data")
	return filenameSecretGroup
}

func ReadSecretGroupFile(secretGroupId string, intermediateKey string) (*model.SecretGroup, error) {
	filenameSecretGroup := getSecretGroupFilenameById(secretGroupId)
	if _, err := os.Stat(filenameSecretGroup); os.IsNotExist(err) {
		return nil, nil
	}
	jsonSecretGroupBytes, err := os.ReadFile(filenameSecretGroup)
	if err != nil {
		return nil, err
	}
	secretGroup, err := crypto.DecryptSecretGroup(intermediateKey, string(jsonSecretGroupBytes))
	if err != nil {
		return nil, err
	}
	return secretGroup, nil
}

func WriteSecretGroupFile(secretGroup model.SecretGroup, intermediateKey string) error {
	jsonSecretGroup, err := crypto.EncryptSecretGroup(intermediateKey, secretGroup)
	if err != nil {
		return err
	}
	secretGroupDirectoryName := getSecretGroupDirectoryNameById(secretGroup.Id)
	if _, err := os.Stat(secretGroupDirectoryName); os.IsNotExist(err) {
		err = os.Mkdir(secretGroupDirectoryName, 0700)
		if err != nil {
			return err
		}
	}
	filenameSecretGroup := getSecretGroupFilenameById(secretGroup.Id)
	err = os.WriteFile(filenameSecretGroup, []byte(*jsonSecretGroup), 0600)
	if err != nil {
		return err
	}
	return nil
}
