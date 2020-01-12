import { useEffect } from 'react';
import { useDataDispatch } from '../hooks';
import { GET_ACCOUNTS } from './types';
import subscribeFirestore from './subscribeFirestore';

const useAccountsFirestore = () => {
  const dispatch = useDataDispatch();
  useEffect(() => {
    const unsubscribeFirestore = subscribeFirestore(newValue => dispatch({
      type: GET_ACCOUNTS,
      payload: newValue
    }));
    return unsubscribeFirestore;
  }, [dispatch]);
};

export default useAccountsFirestore;
