package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"syscall"
	"os"
	"path"
	"strings"
	"errors"

	"golang.org/x/term"
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
		bytePassword, err := term.ReadPassword(int(syscall.Stdin))
		if err != nil {
			return err
		}
		password = string(bytePassword)
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
		bytePassword, err := term.ReadPassword(int(syscall.Stdin))
		if err != nil {
			return err
		}
		password = string(bytePassword)
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
	AWS_ACCESS_KEY_ID string
	AWS_SECRET_ACCESS_KEY string
	AWS_DEFAULT_REGION string
}

type Secret struct {
	id string
	username string
	account_id string
	credential AwsCredential
}

func createSecretFrom(key string, data map[string]map[string]interface{}) (Secret, bool) {
	var newSecret Secret
	dataByKey, found := data[key]
	if !found {
		return newSecret, false
	}
	newSecret.id = key
	newSecret.username = dataByKey["username"].(string)
	newSecret.account_id = dataByKey["account_id"].(string)
	dataCredential := dataByKey["credential"].(map[string]interface{})
	newSecret.credential.AWS_ACCESS_KEY_ID = dataCredential["AWS_ACCESS_KEY_ID"].(string)
	newSecret.credential.AWS_SECRET_ACCESS_KEY = dataCredential["AWS_SECRET_ACCESS_KEY"].(string)
	newSecret.credential.AWS_DEFAULT_REGION = dataCredential["AWS_DEFAULT_REGION"].(string)
	return newSecret, true
}

func getSecret(envSecretBasePath string, passwordParameter string, selectedSecretId string) (error) {
	var encryptedPath = envSecretBasePath+"."+encryptedExtension
	if _, err := os.Stat(encryptedPath); errors.Is(err, os.ErrNotExist) {
		return err
	}
	var password = passwordParameter
	if password == "" {
		fmt.Println("Enter the password to decrypt '"+encryptedPath+"':")
		bytePassword, err := term.ReadPassword(int(syscall.Stdin))
		if err != nil {
			return err
		}
		password = string(bytePassword)
	}
	encryptedJsonDataBytes, err := os.ReadFile(encryptedPath)
	if err != nil {
		return err
	}
	jsonDataBytes, err := decryptBytesAesGcm(password, encryptedJsonDataBytes)
	if err != nil {
		return err
	}

	var data map[string]map[string]interface{}
	err = json.Unmarshal(jsonDataBytes, &data)

	selectedSecret, credentialFound := createSecretFrom(selectedSecretId, data)
	if !credentialFound {
		fmt.Print("Credential '"+selectedSecretId+"' not found")
		os.Exit(1)
	}
	fmt.Println("export AWS_ACCESS_KEY_ID="+selectedSecret.credential.AWS_ACCESS_KEY_ID)
	fmt.Println("export AWS_SECRET_ACCESS_KEY="+selectedSecret.credential.AWS_SECRET_ACCESS_KEY)
	fmt.Println("export AWS_DEFAULT_REGION="+selectedSecret.credential.AWS_DEFAULT_REGION)

	return err
}

func showSecretHead(secret Secret) {
	fmt.Println("Secret: " + secret.id)
	fmt.Println("   Account: " + secret.account_id)
	fmt.Println("   Username: " + secret.username)
}

func listSecrets(envSecretBasePath string) (error) {
	var encryptedPath = envSecretBasePath+"."+encryptedExtension
	if _, err := os.Stat(encryptedPath); errors.Is(err, os.ErrNotExist) {
		return err
	}
	fmt.Println("Enter the password to decrypt '"+encryptedPath+"':")
	bytePassword, err := term.ReadPassword(int(syscall.Stdin))
	if err != nil {
		return err
	}
	var password = string(bytePassword)
	encryptedJsonDataBytes, err := os.ReadFile(encryptedPath)
	if err != nil {
		return err
	}
	jsonDataBytes, err := decryptBytesAesGcm(password, encryptedJsonDataBytes)
	if err != nil {
		return err
	}

	var data map[string]map[string]interface{}
	err = json.Unmarshal(jsonDataBytes, &data)

	for key := range data {
		var secret, _ = createSecretFrom(key, data)
		showSecretHead(secret)
	}

	return err
}

func findSecrets(envSecretBasePath string, findSearchBy string) (error) {
	var encryptedPath = envSecretBasePath+"."+encryptedExtension
	if _, err := os.Stat(encryptedPath); errors.Is(err, os.ErrNotExist) {
		return err
	}
	fmt.Println("Enter the password to decrypt '"+encryptedPath+"':")
	bytePassword, err := term.ReadPassword(int(syscall.Stdin))
	if err != nil {
		return err
	}
	var password = string(bytePassword)
	encryptedJsonDataBytes, err := os.ReadFile(encryptedPath)
	if err != nil {
		return err
	}
	jsonDataBytes, err := decryptBytesAesGcm(password, encryptedJsonDataBytes)
	if err != nil {
		return err
	}

	var data map[string]map[string]interface{}
	err = json.Unmarshal(jsonDataBytes, &data)
	if err != nil {
		return err
	}

	for key := range data {
		var secret,_ =createSecretFrom(key, data)
		var foundById = strings.Contains(secret.id, findSearchBy)
		var foundByUsername = strings.Contains(secret.username, findSearchBy)
		var foundByAccountId = strings.Contains(secret.account_id, findSearchBy)
		if foundById || foundByUsername || foundByAccountId {
			showSecretHead(secret)
		}
	}

	return nil
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
	var validActions = []string{"get","list","find","encrypt","decrypt"}
	var action = "list"
	var passwordParameter = ""
	var selectedSecretId = ""
	var findSearchBy = ""
	if len(os.Args[1:]) > 0 {
		if !Contains(validActions, os.Args[1]) {
			fmt.Print("Invalid action " + os.Args[1])
			os.Exit(1)
			return
		}
		action = os.Args[1]
		var otherArgs = os.Args[2:]
		if len(otherArgs) > 0 && len(otherArgs[0]) > 11 && otherArgs[0][0:11] == "--password=" {
			passwordParameter = otherArgs[0][11:]
			otherArgs = os.Args[3:]
		}
		if action == "get" && len(otherArgs) == 1 {
			selectedSecretId = otherArgs[0]
		} else if action == "find" && len(otherArgs) == 1 {
			findSearchBy = otherArgs[0]
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
	if action == "get" {
		err := getSecret(envSecretBasePath, passwordParameter, selectedSecretId)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		return
	}
	if action == "find" {
		err := findSecrets(envSecretBasePath, findSearchBy)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		return
	}
	err := listSecrets(envSecretBasePath)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	return
}