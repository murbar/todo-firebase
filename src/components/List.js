import React from 'react';
import styled from 'styled-components';
import { useParams, useHistory, Link } from 'react-router-dom';
import ListItem from './ListItem';
import AddItemInput from './AddItemInput';
import useListItems from 'hooks/useListItems';

const Styles = styled.div``;

export default function List() {
  const { slug } = useParams();
  const history = useHistory();
  const [itemsData, itemsActions] = useListItems(slug);

  if (itemsData.noSuchList) history.replace('/lists');

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
          <Link to="/lists">← Lists</Link>
          <AddItemInput addItem={itemsActions.createItem} />
          <button onClick={itemsActions.toggleShowComplete}>
            {itemsData.list.showComplete ? 'Hide' : 'Show'} completed
          </button>
          {itemsDisplay.length ? (
            <div>
              {itemsDisplay.map((item, index) => (
                <ListItem
                  key={item.id}
                  data={item}
                  index={index}
                  actions={itemsActions}
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
