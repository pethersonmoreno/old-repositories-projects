package crypto

import (
	"encoding/json"
	"secretvault/model"
)

func EncryptSecret(secretGroupId string, key string, secret []model.SecretItem) (*string, error) {
	jsonBytes, err := json.Marshal(secret)
	if err != nil {
		return nil, err
	}
	json := string(jsonBytes)
	return encryptString(secretGroupId, key, json)
}

func DecryptSecret(secretGroupId string, key string, encryptedData string) ([]model.SecretItem, error) {
	bytesEncryptedData := []byte(encryptedData)
	bytesDecryptedData, err := decryptBytes(secretGroupId, key, bytesEncryptedData)
	if err != nil {
		return nil, err
	}
	decryptedSecret := []model.SecretItem{}
	err = json.Unmarshal(bytesDecryptedData, &decryptedSecret)
	if err != nil {
		return nil, err
	}
	return decryptedSecret, nil
}
