import { database } from "./firebase";
const databaseUsers = database.ref("/users");
const getDatabaseUser = uid => databaseUsers.child(uid);
const getDatabaseUserInfo = uid => getDatabaseUser(uid).child("info");
const getDatabaseUserConfig = uid => getDatabaseUser(uid).child("config");

export const newId = () => databaseCategories.push().key;
export const editUserInfo = (uid, info) =>
  getDatabaseUserInfo(uid)
    .set(info)
    .then(() => info);
export const editUserConfig = (uid, config) =>
  getDatabaseUserConfig(uid)
    .set(config)
    .then(() => config);
export const removeUser = uid =>
  getDatabaseUser(uid)
    .remove()
    .then(() => ({ uid, removed: true }));
export const getUserInfo = uid =>
  getDatabaseUserInfo(uid)
    .once("value")
    .then(snapshot => snapshot.val());
export const getUserConfig = uid =>
  getDatabaseUserConfig(uid)
    .once("value")
    .then(snapshot => snapshot.val());
