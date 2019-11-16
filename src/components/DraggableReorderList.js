import React from 'react';
import ListItem from './ListItem';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// style isDraggingOver
const Styles = styled.div``;

export default function DraggableReorderList({ items, itemsActions }) {
  const handleDragEnd = ({ source, destination }) => {
    const { index: from } = source;
    const to = destination ? destination.index : null;

    if (to === null || from === to) return;

    itemsActions.reorderItems(from, to);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="itemList">
        {(provided, snapshot) => (
          <Styles
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={`item-${item.id}`} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <ListItem
                      key={item.id}
                      data={item}
                      index={index}
                      actions={itemsActions}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Styles>
        )}
      </Droppable>
    </DragDropContext>
  );
}
