import { firestore } from '../../../modules/utils/api/firebase';
import mapDocumentToData from '../../../modules/utils/api/firebaseUtil/mapDocumentToData';


const subscribeFirestore = setState => {
  const unsubscribe = firestore
    .collection('accounts')
    .onSnapshot(querySnapshot => {
      const newList = querySnapshot.docs.map(mapDocumentToData);
      setState(newList);
    });
  return unsubscribe;
};

export default subscribeFirestore;
