import { firestore } from '../../../api/firebase';
import mapDocumentToData from '../../../api/firebaseUtil/mapDocumentToData';
import createUseSharedStateSubscriberHook from './createUseSharedStateSubscriberHook';


const createUseSharedCollectionStateSubscriberHook = collectionName => {
  const subscribe = setState => {
    const unsubscribe = firestore
      .collection(collectionName)
      .onSnapshot(querySnapshot => {
        const newList = querySnapshot.docs.map(mapDocumentToData);
        setState(newList);
      });
    return unsubscribe;
  };

  return createUseSharedStateSubscriberHook([], subscribe);
};
export default createUseSharedCollectionStateSubscriberHook;
