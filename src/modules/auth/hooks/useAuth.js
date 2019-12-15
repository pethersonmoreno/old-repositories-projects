import { useEffect } from 'react';
import useAuthState from './useAuthState';
import { start } from '../actions/auth';

const useAuth = () => {
  const [{ loading: loadingAuth }, , unlinkAuthState] = useAuthState();
  useEffect(() => {
    start();
    return unlinkAuthState;
  }, [unlinkAuthState]);
  return { loadingAuth };
};

export default useAuth;
