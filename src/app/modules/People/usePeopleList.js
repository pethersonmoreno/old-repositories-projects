import { useState, useEffect } from 'react';
import { firestore } from '../../../api/firebase';
import mapDocumentToData from '../../../api/firebaseUtil/mapDocumentToData';

const usePeopleList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore
      .collection('people')
      .onSnapshot(querySnapshot => {
        const newList = querySnapshot.docs.map(mapDocumentToData);
        setList(newList);
      });
    return unsubscribe;
  }, []);
  return list;
};

export default usePeopleList;
