import { firestore } from '../firebase';
import mapDocumentToData from './mapDocumentToData';

const getDocument = async (collationName, id) => {
  const doc = await firestore.collection(collationName).doc(id).get();
  if (!doc.exists) {
    throw new Error('Not found document');
  }
  return mapDocumentToData(doc);
};

export default getDocument;
