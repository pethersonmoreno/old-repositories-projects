package crypto

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"encoding/hex"
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

func encryptString(key string, plainData string) (*string, error) {
	bytesEncryptedData, err := encryptBytes(key, []byte(plainData))
	if err != nil {
		return nil, err
	}
	encryptedData := string(bytesEncryptedData)
	return &encryptedData, nil
}
func encryptBytes(key string, plainData []byte) ([]byte, error) {
	aesgcm, err := newAesGcm(key)
	if err != nil {
		return nil, err
	}
	bytesEncryptedData := aesgcm.Seal(nil, cipherKey, []byte(plainData), nil)
	return bytesEncryptedData, nil
}

func decryptBytes(key string, bytesEncryptedData []byte) ([]byte, error) {
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
