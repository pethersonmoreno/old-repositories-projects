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
export const startListenAuthChanges = (listenCallBack, onError = null) => {
  if (!dicListenChanges[listenCallBack]) {
    dicListenChanges[listenCallBack] = auth.onAuthStateChanged(
      listenCallBack,
      onError
    );
  }
};
export const stopListenAuthChanges = listenCallBack => {
  if (dicListenChanges[listenCallBack]) {
    dicListenChanges[listenCallBack]();
    delete dicListenChanges[listenCallBack];
  }
};
