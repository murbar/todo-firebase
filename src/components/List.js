import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import useLocalStorageState from 'hooks/useLocalStorageState';
import ListItem from './ListItem';
import AddItemInput from './AddItemInput';
import uuid from 'uuid/v4';

const Styles = styled.div``;

const constructNewItem = title => ({
  id: uuid(),
  title,
  isComplete: false
});

const listMeta = {
  id: '1',
  title: 'Groceries',
  isComplete: false
};

const listItems = [
  { id: '1', title: 'Beans', isComplete: false },
  { id: '2', title: 'Butter', isComplete: true },
  { id: '3', title: 'Biscuits', isComplete: false }
];

export default function List() {
  const { slug } = useParams();
  const storageKey = slug ? `listData-${slug}` : 'listData-default';
  const [listData, setListData] = useLocalStorageState(storageKey, {
    list: listMeta,
    items: listItems,
    showCompleted: false
  });

  const uncompletedItemCount = listItems.reduce(
    (count, i) => (!i.isComplete ? count + 1 : count),
    0
  );

  React.useEffect(() => {
    // fetch list data
    // fetch list items
  }, [slug]);

  const toggleCompleted = id => {
    // cache item
    // update state immediately
    // update item in store
    // put cache back in state if store update fails
    setListData(prev => {
      return {
        ...prev,
        items: prev.items.map(i =>
          i.id === id ? { ...i, isComplete: !i.isComplete } : i
        )
      };
    });
  };

  const addItem = title => {
    setListData(prev => ({
      ...prev,
      items: [...prev.items, constructNewItem(title)]
    }));
    return true;
  };

  const removeItem = id => {
    setListData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== id)
    }));
  };

  const toggleShowCompleted = () => {
    setListData(prev => ({
      ...prev,
      showCompleted: !prev.showCompleted
    }));
  };

  const displayItems = listData.showCompleted
    ? listData.items
    : listData.items.filter(i => !i.isComplete);

  return (
    <Styles>
      <h2>
        {listData.list.title} ({uncompletedItemCount})
      </h2>
      <Link to="/lists">Back to lists</Link>
      <AddItemInput addItem={addItem} />
      <button onClick={toggleShowCompleted}>
        {listData.showCompleted ? 'Hide' : 'Show'} completed
      </button>
      <div>
        {displayItems.map(item => (
          <ListItem key={item.id} data={item} actions={{ toggleCompleted, removeItem }} />
        ))}
      </div>
    </Styles>
  );
}
