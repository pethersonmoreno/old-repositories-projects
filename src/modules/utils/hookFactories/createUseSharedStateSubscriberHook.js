/* eslint-disable no-param-reassign */
import { useState, useEffect, useCallback } from 'react';


const callSetStateListeners = data => data.setStateListeners.forEach(listener => {
  listener(data.state);
});
const updateState = (data, newStateValue) => {
  if (JSON.stringify(data.state) !== JSON.stringify(newStateValue)) {
    data.state = newStateValue;
    callSetStateListeners(data);
  }
};
const createUnsubscribeOnUnmount = ({ unsubscribe }) => () => {
  useEffect(() => unsubscribe, []);
};

const createUseStateFunction = data => {
  const useStateFunction = () => {
    const newListener = useState()[1];
    const unlinkState = useCallback(() => {
      data.setStateListeners = data.setStateListeners.filter(
        listener =>
          listener !== newListener
      );
    }, [newListener]);
    useEffect(() => {
      if (!data.unsubscribe) {
        data.unsubscribe = data.subscribe(newStateValue => updateState(data, newStateValue));
      }
      data.setStateListeners.push(newListener);
      return unlinkState;
    }, [newListener, unlinkState]);
    return [data.state, unlinkState];
  };
  return useStateFunction;
};

const createUseSharedStateSubscriberHook = (initialState, subscribe) => {
  const data = {
    state: initialState,
    setStateListeners: [],
    initialState,
    unsubscribe: null,
  };
  data.subscribe = subscribe;
  const getState = () => data.state;
  const useStateFunction = createUseStateFunction(data);
  const unsubscribeOnUnmount = createUnsubscribeOnUnmount(data);
  return {
    getState,
    useState: useStateFunction,
    unsubscribeOnUnmount,
  };
};

export default createUseSharedStateSubscriberHook;
