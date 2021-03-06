import React from 'react';
import styled from 'styled-components';
import { useParams, useHistory, Link } from 'react-router-dom';
import AddItemInput from './AddItemInput';
import useListItems from 'hooks/useListItems';
import MainHeading from './common/MainHeading';
import Button from './common/Button';
import DraggableReorderList from './DraggableReorderList';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';

const Badge = styled.div`
  display: inline-flex;
  color: ${p => p.theme.colors.background};
  background: ${p => (p.label ? p.theme.colors[p.label] : 'blue')};
  margin-left: 0.5em;
  width: 1.35em;
  height: 1.35em;
  border-radius: 50%;
  font-size: 0.6em;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

const Styles = styled.div``;

const BackLink = () => {
  return (
    <Link to="/lists">
      <ArrowLeftIcon size={'1em'} /> Lists
    </Link>
  );
};

export default function List() {
  const { slug } = useParams();
  const history = useHistory();
  const [itemsData, itemsActions] = useListItems(slug);
  const { items } = itemsData;
  const list = React.useMemo(() => {
    return itemsData.list;
  }, [itemsData.list]);

  if (itemsData.noSuchList) history.replace('/lists');

  const uncompletedItemCount = items.reduce(
    (count, i) => (!i.isComplete ? count + 1 : count),
    0
  );
  const visibleItems =
    list && list.showComplete ? items : items.filter(i => !i.isComplete);

  const isEmpty = items.length === 0;
  const allCompleted = visibleItems.length === 0 && !isEmpty;

  let pageTitle = list.title;
  if (uncompletedItemCount > 0) {
    pageTitle += ` (${uncompletedItemCount})`;
  }
  useDocumentTitle(pageTitle);

  return (
    <Styles>
      {list ? (
        <>
          <BackLink />
          <MainHeading label={list.label}>
            {list.title}
            {uncompletedItemCount > 0 && (
              <Badge label={list.label}>{uncompletedItemCount}</Badge>
            )}
          </MainHeading>
          <AddItemInput addItem={itemsActions.createItem} />

          {!isEmpty && (
            <Button onClick={itemsActions.toggleShowComplete}>
              {list.showComplete ? 'Hide' : 'Show'} completed
            </Button>
          )}

          {visibleItems.length > 0 && (
            <>
              <DraggableReorderList items={visibleItems} itemsActions={itemsActions} />
            </>
          )}

          {isEmpty && <div>This list has no items</div>}

          {allCompleted && <div>All items marked complete</div>}

          <BottomControls></BottomControls>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Styles>
  );
}
