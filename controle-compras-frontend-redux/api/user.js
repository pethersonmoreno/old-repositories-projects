import { database } from "./firebase";

const databaseUsers = database.ref("/users");
const getDatabaseUser = uid => databaseUsers.child(uid);
const getDatabaseUserInfo = uid => getDatabaseUser(uid).child("info");
const getDatabaseUserConfig = uid => getDatabaseUser(uid).child("config");

const editUserInfo = (uid, info) =>
  getDatabaseUserInfo(uid)
    .set(info)
    .then(() => info);
const getUserInfo = uid =>
  getDatabaseUserInfo(uid)
    .once("value")
    .then(snapshot => snapshot.val());
const editUserConfig = (uid, config) =>
  getDatabaseUserConfig(uid)
    .set(config)
    .then(() => config);
const getUserConfig = uid =>
  getDatabaseUserConfig(uid)
    .once("value")
    .then(snapshot => snapshot.val());
const removeUser = uid =>
  getDatabaseUser(uid)
    .remove()
    .then(() => ({ uid, removed: true }));
export {
  getDatabaseUser,
  editUserInfo,
  getUserInfo,
  editUserConfig,
  getUserConfig,
  removeUser
};
