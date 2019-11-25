import React from 'react';
import styled, { css } from 'styled-components';
import CheckBox from './common/CheckBox';
import { Code as CodeIcon } from 'react-feather';
import { X as XIcon } from 'react-feather';

const isDraggingStyles = css`
  transform: scale(1.05);
  opacity: 0.8;
`;

const Styles = styled.div`
  background: white;
  padding: 1.5rem 1rem;
  display: flex;
  /* align-items: center; */
  border-bottom: 1px solid #ccc;
  transition: transform 100ms;
  ${p => p.isDragging && isDraggingStyles}
`;

const Toggle = styled.div`
  padding-right: 0.5em;
`;

const Title = styled.div`
  flex: 1;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Control = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
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

      <Title {...dragHandleProps}>{title}</Title>

      <ControlGroup>
        <Control onClick={remove}>
          <XIcon color={'grey'} />
        </Control>
      </ControlGroup>
    </Styles>
  );
}
