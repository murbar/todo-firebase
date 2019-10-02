import { useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';
import firestore from 'fb/firestore';
import { fieldValues, collections } from 'fb/config';
import { useAuth } from 'contexts/AuthContext';
import slugify from 'url-slug';

const constructNewList = (title, userId) => {
  return {
    title,
    slug: slugify(title),
    userId,
    showComplete: false,
    createdAt: fieldValues.serverTimestamp(),
    updatedAt: fieldValues.serverTimestamp()
  };
};

export default function useLists() {
  const { user } = useAuth();
  const [listsData, setListsData] = useLocalStorageState('lists-data', []);

  useEffect(() => {
    // if (user) {
    const unsubscribe = firestore
      .collection(collections.LISTS)
      .where('userId', '==', user.uid)
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListsData(records);
      });

    return () => unsubscribe();
    // }
  }, [setListsData, user]);

  const createList = async title => {
    try {
      await firestore
        .collection(collections.LISTS)
        .add(constructNewList(title, user.uid));
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const removeList = async id => {
    try {
      await firestore
        .collection(collections.LISTS)
        .doc(id)
        .delete();
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const retitleList = async (id, title) => {
    // need to update slug as well
    // check if slug already exists
    try {
      await firestore
        .collection(collections.LISTS)
        .doc(id)
        .update({
          title,
          updatedAt: fieldValues.serverTimestamp()
        });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const actions = {
    createList,
    removeList,
    retitleList
  };

  return [listsData, actions];
}
