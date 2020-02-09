import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../selectors/selectorsAuth';

const authIsDifferent = (authState, authCompare) => Object.keys(authCompare).find(key => {
  const { [key]: value } = authState;
  return value !== authCompare[key];
});

const useWithAuthorization = (authCompare, pathToGoIfDifferent) => {
  const history = useHistory();
  const authState = useAuthState();
  const isDifferent = authIsDifferent(authState, authCompare);
  useEffect(() => {
    if (isDifferent) {
      history.push(pathToGoIfDifferent);
    }
  }, [history, isDifferent, pathToGoIfDifferent]);
  return [isDifferent];
};

export default useWithAuthorization;
