import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ListItem from './ListItem';
import AddItemInput from './AddItemInput';
import useListItems from 'hooks/useListItems';

const Styles = styled.div``;

export default function List() {
  const { slug } = useParams();
  const [itemsData, itemsActions] = useListItems(slug);
  const uncompletedItemCount = itemsData.items.reduce(
    (count, i) => (!i.isComplete ? count + 1 : count),
    0
  );
  const itemsDisplay =
    itemsData.list && itemsData.list.showComplete
      ? itemsData.items
      : itemsData.items.filter(i => !i.isComplete);

  return (
    <Styles>
      {itemsData.list ? (
        <>
          <h2>
            {itemsData.list.title} ({uncompletedItemCount})
          </h2>
          <AddItemInput addItem={itemsActions.createItem} />
          <button onClick={itemsActions.toggleShowComplete}>
            {itemsData.list.showComplete ? 'Hide' : 'Show'} completed
          </button>
          {itemsDisplay.length ? (
            <div>
              {itemsDisplay.map(item => (
                <ListItem
                  key={item.id}
                  data={item}
                  actions={{
                    toggleComplete: itemsActions.toggleItemComplete,
                    removeItem: itemsActions.removeItem
                  }}
                />
              ))}
            </div>
          ) : (
            <div>No items</div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Styles>
  );
}
