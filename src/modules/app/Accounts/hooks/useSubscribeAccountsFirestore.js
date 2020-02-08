import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import subscribeFirestore from '../../../utils/firestore/subscribeFirestore';
import { COLLECTION_NAME } from '../constants';
import * as actions from '../actions/actionsAccounts';

const useSubscribeAccountsFirestore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFirestore = subscribeFirestore(
      COLLECTION_NAME,
      list => dispatch(actions.getAccounts(list)),
    );
    return unsubscribeFirestore;
  }, [dispatch]);
};

export default useSubscribeAccountsFirestore;
