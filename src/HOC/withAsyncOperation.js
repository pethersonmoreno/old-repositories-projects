import React from 'react';
import { notification } from './withNotification';

let loading = true;
const pendingOperations = [];
const updateLoading = (operation, enable) => {
  const index = pendingOperations.indexOf(operation);
  if (enable) {
    if (index === -1) {
      pendingOperations.push(operation);
    }
  } else if (index !== -1) {
    pendingOperations.splice(index, 1);
  }
  loading = pendingOperations.length > 0;
};
const callbacksChangeLoading = [];
const enableDisableLoading = (operation, enable) => {
  updateLoading(operation, enable);
  callbacksChangeLoading.forEach(callback => callback(loading));
};
const defaultParams = {
  operation: Promise.resolve(null),
  successMessage: null,
  successCallback: null,
  errorMessage: null,
  errorCallback: null,
};
const connectionActive = true;
export const asyncOperation = async (operation, params) => {
  const operationInfo = { ...defaultParams, ...params };
  enableDisableLoading(operation, true);
  try {
    let operationToExecute = operation;
    if (!(operation instanceof Promise)) {
      operationToExecute = operation();
    }
    let result;
    if (connectionActive) {
      result = await operationToExecute;
    } else {
      result = operationToExecute;
    }
    if (operationInfo.successMessage) {
      notification.success(operationInfo.successMessage);
    }
    if (operationInfo.successCallback) {
      operationInfo.successCallback(result);
    }
    return result;
  } catch (error) {
    if (operationInfo.errorMessage) {
      notification.error(operationInfo.errorMessage, error);
    }
    if (operationInfo.errorCallback) {
      operationInfo.errorCallback(error);
    }
    throw error;
  } finally {
    if (loading) {
      enableDisableLoading(operation, false);
    }
  }
};
export const withLoading = () => WrappedComponent => class extends React.Component {
    state = {
      loading,
    };

    componentWillMount() {
      callbacksChangeLoading.push(this.changeLoading);
    }

    componentWillUnmount() {
      const index = callbacksChangeLoading.indexOf(this.changeLoading);
      if (index > -1) {
        callbacksChangeLoading.splice(index, 1);
      }
    }

    changeLoading = (isLoading) => {
      this.setState({ loading: isLoading });
    };

    render() {
      const { loading: isLoading } = this.state;
      return <WrappedComponent {...this.props} loading={isLoading} />;
    }
};
const withAsyncOperation = () => WrappedComponent => props => (
  <WrappedComponent {...props} asyncOperation={asyncOperation} />
);
export default withAsyncOperation;
