import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function ListItem({ data, actions }) {
  const { id, title, isComplete } = data;
  return (
    <Styles>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={() => actions.toggleCompleted(id)}
      />{' '}
      {title} <button onClick={() => actions.removeItem(id)}>X</button>
    </Styles>
  );
}
