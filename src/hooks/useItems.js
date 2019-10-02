import { useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';
import firestore from 'fb/firestore';
import { fieldValues, collections } from 'fb/config';
import { useAuth } from 'contexts/AuthContext';

const constructNewItem = (title, userId, listId) => ({
  title,
  isComplete: false,
  dueDate: null,
  details: '',
  listId,
  userId,
  createdAt: fieldValues.serverTimestamp(),
  updatedAt: fieldValues.serverTimestamp()
});

const addUpdateTimestamp = item => ({
  ...item,
  updatedAt: fieldValues.serverTimestamp()
});

export default function useItems(listSlug) {
  const { user } = useAuth();
  const [list, setList] = useLocalStorageState(`list-${listSlug}`, null);
  const [items, setItems] = useLocalStorageState(`items-${listSlug}`, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection(collections.LISTS)
        .where('slug', '==', listSlug)
        .where('userId', '==', user.uid)
        .limit(1)
        .onSnapshot(snapshot => {
          const records = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // setListsData(records);
          console.log(records);
          setList(records[0]);
        });
      return () => unsubscribe();
    }
  }, [listSlug, setList, user]);

  useEffect(() => {
    if (user && list) {
      const unsubscribe = firestore
        .collection(collections.ITEMS)
        .where('listId', '==', list.id)
        .where('userId', '==', user.uid)
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
          const records = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setItems(records);
        });
      return () => unsubscribe();
    }
  }, [list, setItems, user]);

  const retitleList = async title => {
    try {
      await firestore
        .collection(collections.LISTS)
        .doc(list.id)
        .update(
          addUpdateTimestamp({
            title
          })
        );
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const createItem = async title => {
    try {
      await firestore
        .collection(collections.ITEMS)
        .add(constructNewItem(title, user.uid, list.id));
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const removeItem = async id => {
    try {
      await firestore
        .collection(collections.ITEMS)
        .doc(id)
        .delete();
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const toggleComplete = async (id, isComplete) => {
    try {
      await firestore
        .collection(collections.ITEMS)
        .doc(id)
        .update(
          addUpdateTimestamp({
            isComplete: !isComplete
          })
        );
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const toggleShowComplete = async () => {
    try {
      await firestore
        .collection(collections.LISTS)
        .doc(list.id)
        .update(
          addUpdateTimestamp({
            showComplete: !list.showComplete
          })
        );
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const actions = {
    retitleList,
    toggleShowComplete,
    createItem,
    removeItem,
    toggleComplete
  };

  const data = {
    list,
    items
  };

  return [data, actions];
}
