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

const createSetStateObject = data => newState => {
  let newStateValue;
  if (typeof newState === 'function') {
    const newStateChangeFn = newState;
    newStateValue = { ...data.state, ...newStateChangeFn(data.state) };
  } else {
    newStateValue = { ...data.state, ...newState };
  }
  updateState(data, newStateValue);
};
const createSetStateValue = data => newState => {
  let newStateValue = newState;
  if (typeof newState === 'function') {
    const newStateChangeFn = newState;
    newStateValue = newStateChangeFn(data.state);
  }
  updateState(data, newStateValue);
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
      // Called just after component mount
      data.setStateListeners.push(newListener);
      return unlinkState;
    }, [newListener, unlinkState]);
    return [data.state, data.setState, unlinkState];
  };
  return useStateFunction;
};

const createUseSharedStateHook = initialState => {
  const data = {
    state: initialState,
    setStateListeners: [],
    initialState
  };
  if (typeof initialState === 'object' && initialState !== null) {
    data.setState = createSetStateObject(data);
  } else {
    data.setState = createSetStateValue(data);
  }
  const getState = () => data.state;
  const useStateFunction = createUseStateFunction(data);
  return {
    getState,
    setState: data.setState,
    useState: useStateFunction,
  };
};

export default createUseSharedStateHook;
