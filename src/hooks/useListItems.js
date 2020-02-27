import React from 'react';
import useLocalStorageState from './useLocalStorageState';
import firestore from 'fb/firestore';
import { fieldValues, collections } from 'fb/config';
import { useAuth } from 'contexts/AuthContext';
import useLists from './useLists';
import { reorderArray, buildRequestWrapper } from 'helpers';

const constructNewItem = (title, userId, listId, lastSortOrder) => ({
  title,
  isComplete: false,
  dueDate: null,
  details: '',
  listId,
  userId,
  createdAt: fieldValues.serverTimestamp(),
  updatedAt: fieldValues.serverTimestamp(),
  sortOrder: lastSortOrder + 1
});

export default function useListItems(listSlug) {
  const { user } = useAuth();
  const [listsData, listsActions] = useLists();
  const list = listsData.lists.find(l => l.slug === listSlug);
  const [items, setItems] = useLocalStorageState(`items-${listSlug}`, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const noSuchList = !isLoading && !list;

  const wrapRequest = buildRequestWrapper(setIsLoading, setError);

  React.useEffect(() => {
    if (user && list) {
      const unsubscribe = firestore
        .collection(collections.ITEMS)
        .where('listId', '==', list.id)
        .where('userId', '==', user.uid)
        .orderBy('sortOrder')
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
      .add(constructNewItem(title, user.uid, list.id, items.length));
  }, 'Cannot create new item');

  const removeItem = wrapRequest(async id => {
    await firestore
      .collection(collections.ITEMS)
      .doc(id)
      .delete();
  }, 'Cannot remove item');

  const toggleItemComplete = wrapRequest(async (id, isComplete) => {
    await firestore
      .collection(collections.ITEMS)
      .doc(id)
      .update({
        isComplete: !isComplete,
        updatedAt: fieldValues.serverTimestamp()
      });
  }, 'Cannot toggle item complete');

  const reorderItems = wrapRequest(async (currentIndex, targetIndex) => {
    const reordered = reorderArray(items, currentIndex, targetIndex);
    setItems(reordered);

    const reorderedSortOrders = reordered.map((item, index) => ({
      id: item.id,
      sortOrder: index + 1
    }));

    const writeBatch = firestore.batch();
    items.forEach(item => {
      const newSortOrder = reorderedSortOrders.find(i => i.id === item.id).sortOrder;
      if (item.sortOrder !== newSortOrder) {
        const itemRef = firestore.collection(collections.ITEMS).doc(item.id);
        writeBatch.update(itemRef, {
          sortOrder: newSortOrder
        });
      }
    });
    writeBatch.commit();
  }, 'Cannot set items order');

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
    removeList: listsActions.removeList,
    toggleShowComplete,
    createItem,
    removeItem,
    toggleItemComplete,
    reorderItems
  };

  const data = {
    list,
    items,
    isLoading,
    error,
    noSuchList
  };

  return [data, actions];
}
