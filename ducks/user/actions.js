import types from "./types";

const editUserInfo = payload => ({
  type: types.EDIT_USER_INFO,
  payload
});
const sendEmailVerification = payload => ({
  type: types.SEND_EMAIL_VERIFICATION,
  payload
});
const getUserInfo = payload => ({
  type: types.GET_USER_INFO,
  payload
});
const editUserConfig = payload => ({
  type: types.EDIT_USER_CONFIG,
  payload
});
const getUserConfig = payload => ({
  type: types.GET_USER_CONFIG,
  payload
});
export default {
  editUserInfo,
  sendEmailVerification,
  getUserInfo,
  editUserConfig,
  getUserConfig
};
