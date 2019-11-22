/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';


const createSetState = data => {
  const setState = newState => {
    if (typeof newState === 'function') {
      const newStateChangeFn = newState;
      data.state = { ...data.state, ...newStateChangeFn(data.state) };
    } else {
      data.state = { ...data.state, ...newState };
    }
    data.setStateListeners.forEach(listener => {
      listener(data.state);
    });
  };
  return setState;
};

const createUseStateFunction = data => {
  const useStateFunction = () => {
    const newListener = useState()[1];
    useEffect(() => {
      // Called just after component mount
      data.setStateListeners.push(newListener);
      return () => {
        // Called just before the component unmount
        data.setStateListeners = data.setStateListeners.filter(
          listener =>
            listener !== newListener
        );
      };
    }, [newListener]);
    return [data.state, data.setState];
  };
  return useStateFunction;
};

const createUseSharedStateHook = initialState => {
  const data = {
    state: initialState,
    setStateListeners: [],
  };
  data.setState = createSetState(data);
  const getState = () => data.state;
  const useStateFunction = createUseStateFunction(data);
  return {
    getState,
    setState: data.setState,
    useState: useStateFunction,
  };
};

export default createUseSharedStateHook;
