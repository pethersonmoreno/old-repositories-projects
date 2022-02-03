package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"bufio"
	"os"
	"path"
	"errors"
)

var cipherKey = []byte("j&L!@#?~*>)K")

func createSimpleMd5Hash(key string) string {
	hasher := md5.New()
	hasher.Write([]byte(key))
	return hex.EncodeToString(hasher.Sum(nil))
}

func newAesGcm(key string) (cipher.AEAD, error) {
	cipherBlock, err := aes.NewCipher([]byte(createSimpleMd5Hash(key)))
	if err != nil {
		return nil, err
	}
	aesgcm, err := cipher.NewGCM(cipherBlock)
	if err != nil {
		return nil, err
	}
	return aesgcm, nil
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

func Contains(array []string, element string) bool {
    for _, value := range array {
        if value == element {
            return true
        }
    }
    return false
}

var jsonExtension = "json"
var encryptedExtension = "jert"

func encryptJson(envSecretBasePath string, passwordParameter string) (error) {
	var jsonPath = envSecretBasePath+"."+jsonExtension
	var encryptedPath = envSecretBasePath+"."+encryptedExtension
	if _, err := os.Stat(jsonPath); errors.Is(err, os.ErrNotExist) {
		return err
	}
	var password = passwordParameter
	if password == "" {
		fmt.Println("Enter the password to encrypt from '"+jsonPath+"' to '"+encryptedPath+"':")
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()
		password = scanner.Text()
	}
	jsonDataBytes, err := os.ReadFile(jsonPath)
	if err != nil {
		return err
	}
	encryptedJsonDataBytes, err := encryptBytesAesGcm(password, jsonDataBytes)
	if err != nil {
		return err
	}
	err = os.WriteFile(encryptedPath, encryptedJsonDataBytes, 0600)

	return err
}

func decryptJson(envSecretBasePath string, passwordParameter string) (error) {
	var jsonPath = envSecretBasePath+"."+jsonExtension
	var encryptedPath = envSecretBasePath+"."+encryptedExtension
	if _, err := os.Stat(encryptedPath); errors.Is(err, os.ErrNotExist) {
		return err
	}
	var password = passwordParameter
	if password == "" {
		fmt.Println("Enter the password to decrypt from '"+encryptedPath+"' to '"+jsonPath+"':")
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()
		password = scanner.Text()
	}
	encryptedJsonDataBytes, err := os.ReadFile(encryptedPath)
	if err != nil {
		return err
	}
	jsonDataBytes, err := decryptBytesAesGcm(password, encryptedJsonDataBytes)
	if err != nil {
		return err
	}
	err = os.WriteFile(jsonPath, jsonDataBytes, 0600)

	return err
}

type AwsCredential struct {
	AWS_ACCESS_KEY_ID string `json: "AWS_ACCESS_KEY_ID"`
	AWS_SECRET_ACCESS_KEY string `json: "AWS_SECRET_ACCESS_KEY"`
	AWS_DEFAULT_REGION string `json: "AWS_DEFAULT_REGION"`
}


func getSecret(envSecretBasePath string, passwordParameter string, preSelectedCredential string) (error) {
	var encryptedPath = envSecretBasePath+"."+encryptedExtension
	if _, err := os.Stat(encryptedPath); errors.Is(err, os.ErrNotExist) {
		return err
	}
	var password = passwordParameter
	if password == "" {
		fmt.Println("Enter the password to decrypt '"+encryptedPath+"':")
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()
		password = scanner.Text()
	}
	encryptedJsonDataBytes, err := os.ReadFile(encryptedPath)
	if err != nil {
		return err
	}
	jsonDataBytes, err := decryptBytesAesGcm(password, encryptedJsonDataBytes)
	if err != nil {
		return err
	}

	var data map[string]AwsCredential
	err = json.Unmarshal(jsonDataBytes, &data)

	selectedCredential, credentialFound := data[preSelectedCredential]
	if !credentialFound {
		fmt.Print("Credential '"+preSelectedCredential+"' not found")
		os.Exit(1)
	}
	fmt.Println("export AWS_ACCESS_KEY_ID="+selectedCredential.AWS_ACCESS_KEY_ID)
	fmt.Println("export AWS_SECRET_ACCESS_KEY="+selectedCredential.AWS_SECRET_ACCESS_KEY)
	fmt.Println("export AWS_DEFAULT_REGION="+selectedCredential.AWS_DEFAULT_REGION)

	return err
}

func main() {
	var envSecretDirectoryPath = os.Getenv("ENV_SECRET_DIRECTORY_PATH")
	if envSecretDirectoryPath == "" {
		envSecretDirectoryPath = path.Join(os.Getenv("HOME"), "BHS")
	}
	var envSecretName = os.Getenv("ENV_SECRET_NAME")
	if envSecretName == "" {
		envSecretName = "credentials"
	}
	var envSecretBasePath = path.Join(envSecretDirectoryPath, envSecretName)
	var validActions = []string{"get","--", "encrypt", "decrypt"}
	var action = "get"
	var passwordParameter = ""
	var preSelectedCredential = ""
	if len(os.Args[1:]) > 0 {
		if !Contains(validActions, os.Args[1]) {
			fmt.Print("Invalid action " + os.Args[1])
			os.Exit(1)
			return
		}
		action = os.Args[1]
		if action == "--" {
			action = "get"
		}
		var otherArgs = os.Args[2:]
		if len(otherArgs) > 0 && otherArgs[0][0:11] == "--password=" {
			passwordParameter = otherArgs[0][11:]
			otherArgs = os.Args[3:]
		}
		if action == "get" && len(otherArgs) == 1 {
			preSelectedCredential = otherArgs[0]
		} else if len(otherArgs) > 0 {
			fmt.Print("Invalid parameters to action " + action)
			os.Exit(1)
			return
		}
	}
	if action == "encrypt" {
		err := encryptJson(envSecretBasePath, passwordParameter)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		return
	}
	if action == "decrypt" {
		err := decryptJson(envSecretBasePath, passwordParameter)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		return
	}
	err := getSecret(envSecretBasePath, passwordParameter, preSelectedCredential)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	return
}