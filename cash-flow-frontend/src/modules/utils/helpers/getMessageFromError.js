const getMessageFromError = error => {
  let { message } = error;
  if (error.response && error.response.data && error.response.data.message) {
    message = error.response.data.message;
    if (error.response.data.errors) {
      error.response.data.errors.forEach(errorItem => {
        errorItem.messages.forEach(messageItem => {
          message += `\n - ${messageItem}`;
        });
      });
    }
  }
  return message;
};

export default getMessageFromError;
