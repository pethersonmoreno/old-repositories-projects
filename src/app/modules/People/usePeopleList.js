import { firestore } from '../../../firebase';
import mapDocumentToData from '../../../firebaseUtil/mapDocumentToData';

const usePeopleList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore
      .collection('people')
      .onSnapshot((querySnapshot)=>{
        const newList = querySnapshot.map(mapDocumentToData);
        setList(newList);
      });
    return unsubscribe;
  }, []);
  return list;
};

export default usePeopleList;
