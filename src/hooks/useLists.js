import { useEffect, useState } from 'react';
import useLocalStorageState from './useLocalStorageState';
import firestore from 'fb/firestore';
import { fieldValues, collections } from 'fb/config';
import { useAuth } from 'contexts/AuthContext';
import slugify from 'url-slug';
import { reorderArray, buildRequestWrapper } from 'helpers';

const labels = {
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
  BLUE: 'blue',
  PURPLE: 'purple',
  DEFAULT: 'blue'
};

const constructNewList = (title, userId, lastSortOrder, label = labels.DEFAULT) => {
  return {
    title,
    slug: slugify(title),
    label,
    sortOrder: lastSortOrder + 1,
    showComplete: false,
    userId,
    createdAt: fieldValues.serverTimestamp(),
    updatedAt: fieldValues.serverTimestamp()
  };
};

export default function useLists() {
  const { user } = useAuth();
  const [listsData, setListsData] = useLocalStorageState('lists-data', []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrapRequest = buildRequestWrapper(setIsLoading, setError);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection(collections.LISTS)
        .where('userId', '==', user.uid)
        .orderBy('sortOrder')
        .onSnapshot(snapshot => {
          const records = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setListsData(records);
        });

      return () => unsubscribe();
    }
  }, [setListsData, user]);

  const reorderLists = wrapRequest(async (currentIndex, targetIndex) => {
    const newListsData = reorderArray(listsData, currentIndex, targetIndex).map(
      (list, index) => ({
        id: list.id,
        sortOrder: index + 1
      })
    );
    const writeBatch = firestore.batch();
    listsData.forEach(list => {
      const newSortOrder = newListsData.find(l => l.id === list.id).sortOrder;
      if (list.sortOrder !== newSortOrder) {
        const listRef = firestore.collection(collections.LISTS).doc(list.id);
        writeBatch.update(listRef, {
          sortOrder: newSortOrder
        });
      }
    });
    writeBatch.commit();
  }, 'Cannot set lists order');

  const createList = wrapRequest(async title => {
    const newList = constructNewList(title, user.uid, listsData.length);
    await firestore.collection(collections.LISTS).add(newList);
    return newList.slug;
  }, 'Cannot create new list');

  const removeList = wrapRequest(async id => {
    await firestore
      .collection(collections.LISTS)
      .doc(id)
      .delete();
  }, 'Cannot delete list');

  const retitleList = wrapRequest(async (id, title) => {
    // TODO check/handle if slug already exists
    const slug = slugify(title);
    await firestore
      .collection(collections.LISTS)
      .doc(id)
      .update({
        title,
        slug,
        updatedAt: fieldValues.serverTimestamp()
      });
    return slug;
  });

  const data = {
    lists: listsData,
    isLoading,
    error
  };

  const actions = {
    createList,
    removeList,
    retitleList,
    reorderLists
  };

  return [data, actions];
}
