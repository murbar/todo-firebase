import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  background: white;
  margin: 0 0 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
`;

const Toggle = styled.div`
  width: 4rem;
  text-align: center;
`;

const Title = styled.div`
  flex: 1;
`;

const Controls = styled.div`
  width: 10rem;
`;

export default function ListItem({ data, actions, index }) {
  const { id, title, isComplete } = data;

  const toggle = () => actions.toggleItemComplete(id, isComplete);

  const remove = () => actions.removeItem(id);

  return (
    <Styles>
      <Toggle>
        <input type="checkbox" checked={isComplete} onChange={toggle} />
      </Toggle>

      <Title>{title}</Title>

      <Controls>
        <button onClick={remove}>X</button>
        {index !== 0 && (
          <button onClick={() => actions.reorderItems(index, index - 1)}>{'<<'}</button>
        )}
        <button onClick={() => actions.reorderItems(index, index + 1)}>{'>>'}</button>
      </Controls>
    </Styles>
  );
}
