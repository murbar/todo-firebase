import { useState, useEffect } from 'react';
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

export default function useItems(listSlug) {
  const { user } = useAuth();
  const [list, setList] = useLocalStorageState(`list-${listSlug}`, null);
  const [items, setItems] = useLocalStorageState(`items-${listSlug}`, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrapRequest = (callback, errorMessage) => async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      await callback(...args);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // fetch list
  useEffect(() => {
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
        setList(records[0]);
      });
    return () => unsubscribe();
  }, [listSlug, setList, user]);

  // fetch list's items
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

  const retitleList = wrapRequest(async title => {
    await firestore
      .collection(collections.LISTS)
      .doc(list.id)
      .update({
        title,
        updatedAt: fieldValues.serverTimestamp()
      });
  }, 'Cannot change list title');

  const createItem = wrapRequest(async title => {
    await firestore
      .collection(collections.ITEMS)
      .add(constructNewItem(title, user.uid, list.id));
  }, 'Cannot create new item');

  const removeItem = wrapRequest(async id => {
    await firestore
      .collection(collections.ITEMS)
      .doc(id)
      .delete();
  }, 'Cannot remove item');

  const toggleComplete = wrapRequest(async (id, isComplete) => {
    await firestore
      .collection(collections.ITEMS)
      .doc(id)
      .update({
        isComplete: !isComplete,
        updatedAt: fieldValues.serverTimestamp()
      });
  }, 'Cannot toggle item complete');

  const toggleShowComplete = wrapRequest(async () => {
    await firestore
      .collection(collections.LISTS)
      .doc(list.id)
      .update({
        showComplete: !list.showComplete,
        updatedAt: fieldValues.serverTimestamp()
      });
  }, 'Cannot toggle show/hide complete items');

  const actions = {
    retitleList,
    toggleShowComplete,
    createItem,
    removeItem,
    toggleComplete
  };

  const data = {
    list,
    items,
    isLoading,
    error
  };

  return [data, actions];
}
