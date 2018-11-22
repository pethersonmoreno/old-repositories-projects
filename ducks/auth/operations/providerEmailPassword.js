const sendEmailVerification = user => {
  user.sendEmailVerification();
};

const signUpUserWithEmailAndPassword = (email, password) =>
  actions.signIn(
    authApi
      .signUpUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential.user && !userCredential.user.emailVerified) {
          sendEmailVerification(userCredential.user);
        }
        return userCredential.user;
      })
  );
const signInWithEmailAndPassword = (email, password) =>
  actions.signIn(
    authApi.signInWithEmailAndPassword(email, password).then(userCredential => {
      if (userCredential.user && !userCredential.user.emailVerified) {
        sendEmailVerification(userCredential.user);
      }
      return userCredential.user;
    })
  );

export { signUpUserWithEmailAndPassword, signInWithEmailAndPassword };
