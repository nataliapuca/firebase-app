import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase';

type useUserDataProps = string;

const useUserData = (id?: useUserDataProps) => {
  const [currentUserDB, setCurrentUserDB] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(database, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUserDB(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          setCurrentUserDB({});
        }
      }
    };
    fetchData();
  }, [id]);
  return { currentUserDB };
};

export default useUserData;
