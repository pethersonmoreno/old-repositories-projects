import { useEffect } from 'react';
import { setPageTitle } from '../actions';

const useSetPageTitle = title => {
  useEffect(() => {
    setPageTitle(title);
  }, [title]);
};

export default useSetPageTitle;
