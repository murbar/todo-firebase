import React from 'react';
import ListItem from './ListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function DraggableReorderList({ items, itemsActions }) {
  const handleDragEnd = result => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <ListItem
                      key={item.id}
                      data={item}
                      index={index}
                      actions={itemsActions}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
