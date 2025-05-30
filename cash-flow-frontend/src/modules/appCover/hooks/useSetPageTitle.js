import { useEffect } from 'react';
import { setPageTitle } from '../actions';

const useSetPageTitle = () => {
  useEffect(() => {
    setPageTitle('Accounts');
  }, []);
};

export default useSetPageTitle;
