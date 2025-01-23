// src/components/KanbanBoard.js
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Columns';

const KanbanBoard = ({ columns, handleDragEnd, renameColumn, removeColumn, addTask, removeTask }) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardContainer>
        {Object.keys(columns).map((columnId) => {
          const column = columns[columnId];
          return (
            <Column
              key={columnId}
              columnId={columnId}
              column={column}
              renameColumn={renameColumn}
              removeColumn={removeColumn}
              addTask={addTask}
              removeTask={removeTask}
            />
          );
        })}
      </BoardContainer>
    </DragDropContext>
  );
};

export default KanbanBoard;

const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
`;
