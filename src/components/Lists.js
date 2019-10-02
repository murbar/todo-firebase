import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AddListInput from './AddListInput';
import useLists from 'hooks/useLists';

const Styles = styled.div``;

export default function Lists() {
  const [data, actions] = useLists();

  return (
    <Styles>
      <h2>My Lists</h2>
      <AddListInput addList={actions.createList} />
      {data.length === 0 && <h3>No lists</h3>}
      {data.map(l => (
        <div key={l.id}>
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
        </div>
      ))}
    </Styles>
  );
}
