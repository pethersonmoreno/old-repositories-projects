import React from 'react';

let notificationSystem = null;
const notification = {
  success: (title, message = null) => {
    notificationSystem.addNotification({ title, message, level: 'success' });
  },
  error: (title, error = null) => {
    let message = null;
    if (error) {
      message = error && error.message ? error.message : error;
    }
    notificationSystem.addNotification({ title, message, level: 'error' });
  },
  warning: (title, message = null) => {
    notificationSystem.addNotification({ title, message, level: 'warning' });
  },
  info: (title, message = null) => {
    notificationSystem.addNotification({ title, message, level: 'info' });
  },
};

export function setNotificationSystem(pNotificationSystem) {
  notificationSystem = pNotificationSystem;
}
const withNotification = () => WrappedComponent => props => (
  <WrappedComponent notification={notification} {...props} />
);
export default withNotification;
