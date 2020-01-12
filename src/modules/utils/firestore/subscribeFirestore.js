import { firestore } from '../api/firebase';
import mapDocumentToData from '../api/firebaseUtil/mapDocumentToData';


const subscribeFirestore = (collectionName, setState) => {
  const unsubscribe = firestore
    .collection(collectionName)
    .onSnapshot(querySnapshot => {
      const newList = querySnapshot.docs.map(mapDocumentToData);
      setState(newList);
    });
  return unsubscribe;
};

export default subscribeFirestore;
