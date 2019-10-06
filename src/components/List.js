import React from 'react';
import styled from 'styled-components';
import { useParams, useHistory, Link } from 'react-router-dom';
import ListItem from './ListItem';
import AddItemInput from './AddItemInput';
import useListItems from 'hooks/useListItems';
import MainHeading from './common/MainHeading';

const Badge = styled.span`
  display: inline-flex;
  color: ${p => p.theme.colors.background};
  background: ${p => (p.label ? p.theme.colors[p.label] : 'blue')};
  margin-left: 0.5em;
  width: 1.25em;
  height: 1.25em;
  border-radius: 50%;
  font-size: 0.6em;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

const Styles = styled.div``;

export default function List() {
  const { slug } = useParams();
  const history = useHistory();
  const [itemsData, itemsActions] = useListItems(slug);
  const { list, items } = itemsData;

  if (itemsData.noSuchList) history.replace('/lists');

  const uncompletedItemCount = items.reduce(
    (count, i) => (!i.isComplete ? count + 1 : count),
    0
  );
  const itemsDisplay =
    list && list.showComplete ? items : items.filter(i => !i.isComplete);

  return (
    <Styles>
      {list ? (
        <>
          <MainHeading label={list.label}>
            {list.title}
            {uncompletedItemCount > 0 && (
              <Badge label={list.label}>{uncompletedItemCount}</Badge>
            )}
          </MainHeading>
          <Link to="/lists">← Lists</Link>
          <AddItemInput addItem={itemsActions.createItem} />
          <button onClick={itemsActions.toggleShowComplete}>
            {list.showComplete ? 'Hide' : 'Show'} completed
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
