import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase/app';
import { useLoading } from '../selectors/selectorsAuth';
import {
  signOut, getRedirectResult, isValidEmail
} from '../../utils/api/auth';
import * as actions from '../actions/actionsAuth';


const updateUserProfile = async (dispatch, userProfile) => {
  let token = null;
  let isValidEmailBool = false;
  if (userProfile) {
    try {
      token = await userProfile.getIdToken();
      isValidEmailBool = token ? await isValidEmail(token) : false;
    } catch (error) {
      // TODO: Remove it after fix the bugs
      signOut();
      return;
    }
  }
  await dispatch(actions.updateUserProfile({
    userProfile,
    token,
    isValidEmail: isValidEmailBool
  }));
};

const captureAuthChanges = dispatch => {
  let firstAuthChanged = true;
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(async user => {
      await updateUserProfile(dispatch, user);
      if (firstAuthChanged) {
        firstAuthChanged = false;
        resolve();
      }
    });
  });
};
const captureSigInRedirectResult = async dispatch => {
  const userCredential = await getRedirectResult();
  if (userCredential.user) {
    await updateUserProfile(dispatch, userCredential.user);
  }
};

const useAuth = () => {
  const dispatch = useDispatch();
  const loading = useLoading();
  useEffect(() => {
    const start = async () => {
      await captureSigInRedirectResult(dispatch);
      await captureAuthChanges(dispatch);
    };
    start();
  }, [dispatch]);
  return [loading];
};

export default useAuth;
