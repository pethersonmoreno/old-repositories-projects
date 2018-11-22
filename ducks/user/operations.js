import { user as userApi, auth as authApi } from "../../api";
import actions from "./actions";

const promiseUserNotLogged = () => Promise.reject("User not Logged In");
const editUserInfo = info => {
  const user = authApi.getCurrentUser();
  if (user) {
    return actions.editUserInfo(userApi.editUserInfo(user.uid, info));
  }
  return promiseUserNotLogged();
};
const getUserInfo = () => {
  const user = authApi.getCurrentUser();
  return actions.getUserInfo(user ? userApi.getUserInfo(user.uid) : null);
};
const editUserConfig = config => {
  const user = authApi.getCurrentUser();
  if (user) {
    return actions.editUserConfig(userApi.editUserConfig(user.uid, config));
  }
  return promiseUserNotLogged();
};
const getUserConfig = () => {
  const user = authApi.getCurrentUser();
  return actions.getUserConfig(user ? userApi.getUserConfig(user.uid) : null);
};
const sendEmailVerification = () => {
  const user = authApi.getCurrentUser();
  if (user) {
    return actions.sendEmailVerification(
      user.sendEmailVerification().then(() =>
        userApi.editUserInfo(user.uid, {
          sentEmailVerification: true
        })
      )
    );
  }
  return promiseUserNotLogged();
};
export default {
  editUserInfo,
  getUserInfo,
  editUserConfig,
  getUserConfig,
  sendEmailVerification
};
