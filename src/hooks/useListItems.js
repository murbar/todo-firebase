import { useState, useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';
import firestore from 'fb/firestore';
import { fieldValues, collections } from 'fb/config';
import { useAuth } from 'contexts/AuthContext';
import useLists from './useLists';
import { buildRequestWrapper } from 'helpers';

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

export default function useListItems(listSlug) {
  const { user } = useAuth();
  const [listsData, listsActions] = useLists();
  const list = listsData.lists.find(l => l.slug === listSlug);
  const [items, setItems] = useLocalStorageState(`items-${listSlug}`, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrapRequest = buildRequestWrapper(setIsLoading, setError);

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
    retitleList: listsActions.retitleList,
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
