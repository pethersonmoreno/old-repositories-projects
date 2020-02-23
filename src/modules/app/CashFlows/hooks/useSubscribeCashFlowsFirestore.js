import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { firestore } from '../../../utils/api/firebase';
import mapDocumentToData from '../../../utils/api/firebaseUtil/mapDocumentToData';
import { COLLECTION_NAME } from '../constants';
import * as actions from '../actions/actionsCashFlows';
import { useCashFlowsCurrentMonth } from '../selectors/selectorsCashFlows';

const useSubscribePeopleFirestore = () => {
  const dispatch = useDispatch();
  const currentMonth = useCashFlowsCurrentMonth();
  const monthDateStart = moment(`${currentMonth}-01T00:00:00`);
  const monthDateEndLimit = moment(monthDateStart).add('month', 1);
  useEffect(() => {
    const unsubscribeFirestore = firestore
      .collection(COLLECTION_NAME)
      .where('dateTime', '>=', monthDateStart.toDate())
      .where('dateTime', '<', monthDateEndLimit.toDate())
      .onSnapshot(querySnapshot => {
        const newList = querySnapshot.docs.map(mapDocumentToData);
        dispatch(actions.getCashFlows(newList.map(item => ({
          ...item,
          dateTime: item.dateTime.toString(),
        }))));
      });
    return unsubscribeFirestore;
  }, [dispatch, monthDateEndLimit, monthDateStart]);
};

export default useSubscribePeopleFirestore;
