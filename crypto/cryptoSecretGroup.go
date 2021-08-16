package crypto

import (
	"encoding/json"
	"secretvault/model"
)

func EncryptSecretGroup(key string, secretGroup model.SecretGroup) (*string, error) {
	jsonBytes, err := json.Marshal(secretGroup)
	if err != nil {
		return nil, err
	}
	json := string(jsonBytes)
	return encryptString(key, json)
}

func DecryptSecretGroup(key string, encryptedData string) (*model.SecretGroup, error) {
	bytesEncryptedData := []byte(encryptedData)
	bytesDecryptedData, err := decryptBytes(key, bytesEncryptedData)
	if err != nil {
		return nil, err
	}
	secretGroup := model.SecretGroup{}
	err = json.Unmarshal(bytesDecryptedData, &secretGroup)
	if err != nil {
		return nil, err
	}
	return &secretGroup, nil
}
