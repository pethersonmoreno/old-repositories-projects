package io

import (
	"os"
	"path"
	"secretvault/crypto"
	"secretvault/model"
)

func GetSecretGroupDirectoryNameById(secretGroupId string) string {
	return "secretGroup-" + secretGroupId
}

func GetSecretGroupFilenameById(secretGroupId string) string {
	secretGroupDirectoryName := GetSecretGroupDirectoryNameById(secretGroupId)
	filenameSecretGroup := path.Join(secretGroupDirectoryName, "secretGroup.data")
	return filenameSecretGroup
}

func ReadSecretGroupFile(secretGroupId string, intermediateKey string) (*model.SecretGroup, error) {
	filenameSecretGroup := GetSecretGroupFilenameById(secretGroupId)
	if _, err := os.Stat(filenameSecretGroup); os.IsNotExist(err) {
		return nil, nil
	}
	jsonSecretGroupBytes, err := os.ReadFile(filenameSecretGroup)
	if err != nil {
		return nil, err
	}
	secretGroup, err := crypto.DecryptSecretGroup(secretGroupId, intermediateKey, string(jsonSecretGroupBytes))
	if err != nil {
		return nil, err
	}
	return secretGroup, nil
}

func WriteSecretGroupFile(secretGroup model.SecretGroup, intermediateKey string) error {
	encryptedSecretGroup, err := crypto.EncryptSecretGroup(intermediateKey, secretGroup)
	if err != nil {
		return err
	}
	secretGroupDirectoryName := GetSecretGroupDirectoryNameById(secretGroup.Id)
	if _, err := os.Stat(secretGroupDirectoryName); os.IsNotExist(err) {
		err = os.Mkdir(secretGroupDirectoryName, 0700)
		if err != nil {
			return err
		}
	}
	filenameSecretGroup := GetSecretGroupFilenameById(secretGroup.Id)
	err = os.WriteFile(filenameSecretGroup, []byte(*encryptedSecretGroup), 0600)
	if err != nil {
		return err
	}
	return nil
}
