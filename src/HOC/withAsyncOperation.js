import React from 'react';
import { notification } from './withNotification';

let loading = false;
const callbacksChangeLoading = [
  (enable) => {
    loading = enable;
  },
];
const enableDisableLoading = (enable) => {
  callbacksChangeLoading.forEach(callback => callback(enable));
};
const defaultParams = {
  operation: Promise.resolve(null),
  successMessage: null,
  successCallback: null,
  errorMessage: null,
  errorCallback: null,
};
export const asyncOperation = async (operation, params) => {
  const operationInfo = { ...defaultParams, ...params };
  enableDisableLoading(true);
  try {
    let result;
    if (operation instanceof Promise) {
      result = await operation;
    } else {
      result = await operation();
    }
    if (operationInfo.successMessage) {
      notification.success(operationInfo.successMessage);
    }
    if (operationInfo.successCallback) {
      operationInfo.successCallback(result);
    }
  } catch (error) {
    if (operationInfo.errorMessage) {
      notification.error(operationInfo.errorMessage, error);
    }
    if (operationInfo.errorCallback) {
      operationInfo.errorCallback(error);
    }
  } finally {
    if (loading) {
      enableDisableLoading(false);
    }
  }
};
export const withLoading = () => WrappedComponent => class extends React.Component {
    state = {
      loading,
    };

    componentDidMount() {
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
