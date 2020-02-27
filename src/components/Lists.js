import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AddListInput from './AddListInput';
import useLists from 'hooks/useLists';
import MainHeading from './common/MainHeading';

const Styles = styled.div``;

const ListStyles = styled.div`
  font-size: 1.2em;
  line-height: 1;
  padding: 1rem 0;
`;

export default function Lists() {
  const [data, actions] = useLists();

  return (
    <Styles>
      <MainHeading>My Lists</MainHeading>
      <AddListInput addList={actions.createList} />
      {data.lists.length === 0 && <h3>No lists</h3>}
      {data.lists.map((l, index) => (
        <ListStyles key={l.id}>
          <Link to={`/lists/${l.slug}`}>{l.title}</Link>{' '}
          <button onClick={() => actions.removeList(l.id)}>X</button>
          <button
            onClick={() => {
              const title = window.prompt('New title');
              actions.retitleList(l.id, title);
            }}
          >
            Edit
          </button>
          {index !== 0 && (
            <button onClick={() => actions.reorderLists(index, index - 1)}>{'<<'}</button>
          )}
          {index !== data.lists.length - 1 && (
            <button onClick={() => actions.reorderLists(index, index + 1)}>{'>>'}</button>
          )}
        </ListStyles>
      ))}
    </Styles>
  );
}
