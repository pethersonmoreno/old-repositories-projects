package crypto

import (
	"encoding/json"
	"secretvault/model"
)

func EncryptSecret(key string, secret model.Secret) (*string, error) {
	jsonBytes, err := json.Marshal(secret)
	if err != nil {
		return nil, err
	}
	json := string(jsonBytes)
	return encryptString(key, json)
}

func DecryptSecret(key string, encryptedData string) (*model.Secret, error) {
	bytesEncryptedData := []byte(encryptedData)
	bytesDecryptedData, err := decryptBytes(key, bytesEncryptedData)
	if err != nil {
		return nil, err
	}
	decryptedSecret := model.Secret{}
	err = json.Unmarshal(bytesDecryptedData, &decryptedSecret)
	if err != nil {
		return nil, err
	}
	return &decryptedSecret, nil
}
