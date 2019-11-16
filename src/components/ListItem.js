import React from 'react';
import styled, { css } from 'styled-components';
import CheckBox from './common/CheckBox';

const isDraggingStyles = css`
  transform: scale(1.05);
  opacity: 0.8;
`;

const Styles = styled.div`
  background: white;
  padding: 1rem;
  display: flex;
  border-bottom: 1px solid #ccc;
  transition: transform 100ms;
  ${p => p.isDragging && isDraggingStyles}
`;

const Toggle = styled.div`
  padding: 0.25rem 0.5rem 0.25rem 0;
`;

const Title = styled.div`
  flex: 1;
`;

const Controls = styled.div`
  width: 15rem;
`;

export default function ListItem({ data, actions, index, dragHandleProps, isDragging }) {
  const { id, title, isComplete } = data;

  const toggle = () => actions.toggleItemComplete(id, isComplete);

  const remove = () => actions.removeItem(id);

  return (
    <Styles isDragging={isDragging}>
      <Toggle>
        <CheckBox checked={isComplete} onChange={toggle} />
      </Toggle>

      <Title>{title}</Title>

      <Controls>
        <button onClick={remove}>X</button>
        {index !== 0 && (
          <button onClick={() => actions.reorderItems(index, index - 1)}>{'<<'}</button>
        )}
        <button onClick={() => actions.reorderItems(index, index + 1)}>{'>>'}</button>
        <span {...dragHandleProps}>Drag</span>
      </Controls>
    </Styles>
  );
}
