
import React from "react";
import styled from "styled-components";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./Task";
import { useKanban } from '../context/KanbanContext'; // Import the context

const ColumnWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0);
  // background-color: #f4f5f7;
  padding: 15px;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
`;

// const ColumnTitle = styled.h3`
//   margin: 0 0 10px;
//   text-align: center;
// `;

const Column = ({ columnId}) => {
  const { columns } = useKanban();// Access state
  const { setNodeRef } = useDroppable({ id: columnId });
    // console.log(columns[columnId].assignedUsers)
  return (
    <ColumnWrapper ref={setNodeRef}>
      <SortableContext items={columns[columnId].tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        {columns[columnId].tasks.map((task) => (
          <SortableTask
            key={task.id}
            id={task.id}
            task={task}
            columnId={columnId}
            assignUserToTask={task.assignedUsers.split(",")}
          />
        ))}
      </SortableContext>
    </ColumnWrapper>
  );
};

export default Column;
