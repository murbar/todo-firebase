import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function ListItem({ data, actions }) {
  const { id, title, isComplete } = data;

  const toggle = () => actions.toggleComplete(id, isComplete);

  const remove = () => actions.removeItem(id);

  return (
    <Styles>
      <input type="checkbox" checked={isComplete} onChange={toggle} /> {title}{' '}
      <button onClick={remove}>X</button>
    </Styles>
  );
}
