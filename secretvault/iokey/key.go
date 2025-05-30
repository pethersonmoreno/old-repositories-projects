package iokey

import (
	"encoding/json"
	"errors"
	"os"
	"path"
	"secretvault/model"
)

const KeysDirectoryName = "keys"

func getListKeysFilename() string {
	keyFilename := path.Join(KeysDirectoryName, "listKeys.json")
	return keyFilename
}

func getKeyFilenameById(keyId string) string {
	keyFilename := path.Join(KeysDirectoryName, keyId+".key")
	return keyFilename
}

func ReadListKeys() ([]model.KeyListItem, error) {
	listKeysFilename := getListKeysFilename()
	if _, err := os.Stat(listKeysFilename); os.IsNotExist(err) {
		return []model.KeyListItem{}, nil
	}
	jsonListKeysBytes, err := os.ReadFile(listKeysFilename)
	if err != nil {
		return nil, err
	}
	listKeys := []model.KeyListItem{}
	err = json.Unmarshal(jsonListKeysBytes, &listKeys)
	if err != nil {
		return nil, err
	}
	return listKeys, nil
}

func WriteListKeys(listKeys []model.KeyListItem) error {
	err := createKeysDirectoryIfNotExists()
	if err != nil {
		return err
	}
	jsonListKeysBytes, err := json.Marshal(listKeys)
	if err != nil {
		return err
	}
	listKeysFilename := getListKeysFilename()
	return os.WriteFile(listKeysFilename, jsonListKeysBytes, 0600)
}

func ReadKeyFileById(keyId string) (*model.Key, error) {
	listKeys, err := ReadListKeys()
	if err != nil {
		return nil, err
	}
	keyListItem := getKeyListItemFromListKeysById(listKeys, keyId)
	if keyListItem == nil {
		return nil, errors.New("key not found")
	}
	return readKeyFileByKeyListItem(keyListItem)
}

func ReadKeyFileByName(name string) (*model.Key, error) {
	listKeys, err := ReadListKeys()
	if err != nil {
		return nil, err
	}
	keyListItem := getKeyListItemFromListKeysByName(listKeys, name)
	if keyListItem == nil {
		return nil, errors.New("key not found")
	}
	return readKeyFileByKeyListItem(keyListItem)
}

func ReadKeyFileToLocalBySecretGroupId(secretGroupId string) (*model.Key, error) {
	listKeys, err := ReadListKeys()
	if err != nil {
		return nil, err
	}
	keyListItem := getKeyListItemToLocalFromListKeysBySecretGroupId(listKeys, secretGroupId)
	if keyListItem == nil {
		return nil, errors.New("key not found")
	}
	return readKeyFileByKeyListItem(keyListItem)
}

func readKeyFileByKeyListItem(keyListItem *model.KeyListItem) (*model.Key, error) {
	keyFilename := getKeyFilenameById(keyListItem.Id)
	keyFileBytes, err := os.ReadFile(keyFilename)
	if err != nil {
		return nil, err
	}
	key := model.Key{
		Id:                     keyListItem.Id,
		Name:                   keyListItem.Name,
		Key:                    string(keyFileBytes),
		LocalSecretGroupIds:    keyListItem.LocalSecretGroupIds,
		TransferSecretGroupIds: keyListItem.TransferSecretGroupIds,
	}
	return &key, nil
}

func WriteKeyFile(key model.Key) error {
	err := createKeysDirectoryIfNotExists()
	if err != nil {
		return err
	}
	listKeys, err := ReadListKeys()
	if err != nil {
		return err
	}
	keyFilename := getKeyFilenameById(key.Id)
	err = os.WriteFile(keyFilename, []byte(key.Key), 0600)
	if err != nil {
		return err
	}

	index := searchIndexKeyListItem(listKeys, func(keyListItem model.KeyListItem) bool {
		return keyListItem.Id == key.Id
	})
	if index != nil {
		listKeys[*index].Name = key.Name
		listKeys[*index].LocalSecretGroupIds = key.LocalSecretGroupIds
		listKeys[*index].TransferSecretGroupIds = key.TransferSecretGroupIds
	} else {
		listKeys = append(listKeys, model.KeyListItem{
			Id:                     key.Id,
			Name:                   key.Name,
			LocalSecretGroupIds:    key.LocalSecretGroupIds,
			TransferSecretGroupIds: key.TransferSecretGroupIds,
		})
	}
	err = WriteListKeys(listKeys)
	return err
}

func getKeyListItemFromListKeysById(listKeys []model.KeyListItem, keyId string) *model.KeyListItem {
	return searchKeyListItem(listKeys, func(keyListItem model.KeyListItem) bool {
		return keyListItem.Id == keyId
	})
}

func getKeyListItemFromListKeysByName(listKeys []model.KeyListItem, name string) *model.KeyListItem {
	return searchKeyListItem(listKeys, func(keyListItem model.KeyListItem) bool {
		return keyListItem.Name == name
	})
}

func getKeyListItemToLocalFromListKeysBySecretGroupId(listKeys []model.KeyListItem, secretGroupId string) *model.KeyListItem {
	return searchKeyListItem(listKeys, func(keyListItem model.KeyListItem) bool {
		return hasStringInListStrings(secretGroupId, keyListItem.LocalSecretGroupIds)
	})
}

func getKeyListItemToTransferFromListKeysBySecretGroupId(listKeys []model.KeyListItem, secretGroupId string) *model.KeyListItem {
	return searchKeyListItem(listKeys, func(keyListItem model.KeyListItem) bool {
		return hasStringInListStrings(secretGroupId, keyListItem.TransferSecretGroupIds)
	})
}

func searchKeyListItem(listKeys []model.KeyListItem, f func(model.KeyListItem) bool) *model.KeyListItem {
	index := 0
	size := len(listKeys)
	for index < size {
		h := listKeys[index]
		if f(h) {
			return &h
		}
		index = index + 1
	}
	return nil
}

func searchIndexKeyListItem(listKeys []model.KeyListItem, f func(model.KeyListItem) bool) *int {
	index := 0
	size := len(listKeys)
	for index < size {
		h := listKeys[index]
		if f(h) {
			return &index
		}
		index = index + 1
	}
	return nil
}

func hasStringInListStrings(value string, listStrings []string) bool {
	index := 0
	size := len(listStrings)
	for index < size {
		h := listStrings[index]
		if h == value {
			return true
		}
		index = index + 1
	}
	return false
}

func createKeysDirectoryIfNotExists() error {
	if _, err := os.Stat(KeysDirectoryName); os.IsNotExist(err) {
		err = os.Mkdir(KeysDirectoryName, 0700)
		if err != nil {
			return err
		}
	}
	return nil
}
