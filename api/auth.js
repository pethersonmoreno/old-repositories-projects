import { auth } from "./firebase";

const translatedMessages = [
  [
    "Password should be at least 6 characters",
    "Senha deve ter pelo menos 6 caracteres"
  ],
  [
    "The email address is already in use by another account.",
    "O email já está em uso em outra conta."
  ],
  [
    "The email address is badly formatted.",
    "O email não tem um padrão válido."
  ],
  [
    "The password is invalid or the user does not have a password.",
    "Senha inválida."
  ],
  [
    "There is no user record corresponding to this identifier. The user may have been deleted.",
    "Não existe essa conta. O usuário pode ter sido removido."
  ]
];
const translateMessage = message => {
  const messageFound = translatedMessages.find(
    translationItem => translationItem[0] === message
  );
  if (messageFound) {
    return messageFound[1];
  }
  return message;
};
const translateMessageErrorInCatch = error => {
  error.message = translateMessage(error.message);
  throw error;
};

export const signUpUserWithEmailAndPassword = (email, password) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(translateMessageErrorInCatch);

export const signInWithEmailAndPassword = (email, password) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(translateMessageErrorInCatch);

export const signOut = () => auth.signOut().catch(translateMessageErrorInCatch);

export const sendPasswordResetEmail = email =>
  auth.sendPasswordResetEmail(email).catch(translateMessageErrorInCatch);

export const updateCurrentUserPassword = password =>
  auth.currentUser.updatePassword(password);

export const getCurrentUser = () => auth.currentUser;
export const checkAuthState = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      user => {
        unsubscribe();
        resolve(user);
      },
      error => reject(error)
    );
  });
};

let dicListenChanges = {};
export const startListenAuthChanges = listenCallBack => {
  if (!dicListenChanges[listenCallBack]) {
    dicListenChanges[listenCallBack] = auth.onAuthStateChanged(listenCallBack);
  }
};
export const stopListenAuthChanges = listenCallBack => {
  if (dicListenChanges[listenCallBack]) {
    dicListenChanges[listenCallBack]();
  }
};
