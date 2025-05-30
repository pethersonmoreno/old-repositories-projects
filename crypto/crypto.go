package crypto

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/hex"
	"encoding/pem"
	"errors"
	"secretvault/iokey"
	"secretvault/model"
)

var cipherKey = []byte("j&L!@#?~*>)K")

func createSimpleMd5Hash(key string) string {
	hasher := md5.New()
	hasher.Write([]byte(key))
	return hex.EncodeToString(hasher.Sum(nil))
}

func createHash(key string) string {
	return createSimpleMd5Hash(key)
}

func encryptString(secretGroupId string, key string, plainData string) (*string, error) {
	bytesEncryptedData, err := encryptBytes(secretGroupId, key, []byte(plainData))
	if err != nil {
		return nil, err
	}
	encryptedData := string(bytesEncryptedData)
	return &encryptedData, nil
}
func encryptBytes(secretGroupId string, key string, plainData []byte) ([]byte, error) {
	keyRsa, err := iokey.ReadKeyFileToLocalBySecretGroupId(secretGroupId)
	if err != nil {
		return nil, err
	}
	bytesEncryptedDataAesGcm, err := encryptBytesAesGcm(key, plainData)
	if err != nil {
		return nil, err
	}
	return encryptBytesRsa(keyRsa, bytesEncryptedDataAesGcm)
}

func decryptBytes(secretGroupId string, key string, bytesEncryptedDataRsa []byte) ([]byte, error) {
	keyRsa, err := iokey.ReadKeyFileToLocalBySecretGroupId(secretGroupId)
	if err != nil {
		return nil, err
	}
	bytesEncryptedDataAesGcm, err := decryptBytesRsa(keyRsa, bytesEncryptedDataRsa)
	if err != nil {
		return nil, err
	}
	return decryptBytesAesGcm(key, bytesEncryptedDataAesGcm)
}

func encryptBytesRsa(keyRsa *model.Key, plainData []byte) ([]byte, error) {
	privKey, err := convertStrToRsaPrivatekey(keyRsa.Key)
	if err != nil {
		return nil, err
	}
	return rsa.EncryptPKCS1v15(rand.Reader, &privKey.PublicKey, plainData)
}

func decryptBytesRsa(keyRsa *model.Key, bytesEncryptedData []byte) ([]byte, error) {
	privKey, err := convertStrToRsaPrivatekey(keyRsa.Key)
	if err != nil {
		return nil, err
	}
	return rsa.DecryptPKCS1v15(rand.Reader, privKey, bytesEncryptedData)
}

func GenerateRsaKey(bits int) (*string, error) {
	privKey, err := rsa.GenerateKey(rand.Reader, bits)
	if err != nil {
		return nil, err
	}
	privKeyBytes := x509.MarshalPKCS1PrivateKey(privKey)
	privKeyPem := pem.EncodeToMemory(
		&pem.Block{
			Type:  "RSA PRIVATE KEY",
			Bytes: privKeyBytes,
		},
	)
	privKeyStr := string(privKeyPem)
	return &privKeyStr, nil
}

func convertStrToRsaPrivatekey(stringValue string) (*rsa.PrivateKey, error) {
	dataTrafficKeyBlock, _ := pem.Decode([]byte(stringValue))
	if dataTrafficKeyBlock == nil {
		return nil, errors.New("failed to parse PEM block containing the key")
	}

	privDataTrafficKey, err := x509.ParsePKCS1PrivateKey(dataTrafficKeyBlock.Bytes)
	if err != nil {
		return nil, err
	}
	return privDataTrafficKey, nil
}

func encryptBytesAesGcm(key string, plainData []byte) ([]byte, error) {
	aesgcm, err := newAesGcm(key)
	if err != nil {
		return nil, err
	}
	bytesEncryptedData := aesgcm.Seal(nil, cipherKey, []byte(plainData), nil)
	return bytesEncryptedData, nil
}

func decryptBytesAesGcm(key string, bytesEncryptedData []byte) ([]byte, error) {
	aesgcm, err := newAesGcm(key)
	if err != nil {
		return nil, err
	}
	plainDataBytes, err := aesgcm.Open(nil, cipherKey, bytesEncryptedData, nil)
	if err != nil {
		return nil, err
	}
	return plainDataBytes, nil
}

func newAesGcm(key string) (cipher.AEAD, error) {
	cipherBlock, err := aes.NewCipher([]byte(createHash(key)))
	if err != nil {
		return nil, err
	}
	aesgcm, err := cipher.NewGCM(cipherBlock)
	if err != nil {
		return nil, err
	}
	return aesgcm, nil
}
