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
export const translateMessage = message => {
  const messageFound = translatedMessages.find(
    translationItem => translationItem[0] === message
  );
  if (messageFound) {
    return messageFound[1];
  }
  return message;
};
export const translateMessageErrorInCatch = error => {
  error.message = translateMessage(error.message);
  throw error;
};
