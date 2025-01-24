// import React from 'react';
// import styled from 'styled-components';
// // import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
// // import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { useDroppable } from '@dnd-kit/core';
// import SortableTask from './Task';


// const ColumnWrapper = styled.div`
//   background-color: #f4f5f7;
//   padding: 15px;
//   border-radius: 10px;
//   width: 300px;
//   margin: 10px;
// `;

// const ColumnTitle = styled.h3`
//   margin: 0 0 10px;
//   text-align: center;
// `;




// const Column = ({ columnId, columns, setColumns, deleteTask, toggleTaskCompletion, editTask }) => {
//     const { setNodeRef } = useDroppable({
//         id: columnId,
//     });
  
//   return (
//     <ColumnWrapper>
//       <div ref={setNodeRef}>
//       <ColumnTitle>{columns[columnId].title}</ColumnTitle>
//         <SortableContext items={columns[columnId].tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
//           {columns[columnId].tasks.map((task) => (
//             <SortableTask
//               key={task.id}
//               id={task.id}
//               task={task}
//               columnId={columnId}
//               deleteTask={deleteTask}
//               toggleTaskCompletion={toggleTaskCompletion}
//               editTask={editTask}
//             />
//           ))}
//         </SortableContext>
//       </div>
//     </ColumnWrapper>
//   );
// };

// export default Column;

import React from "react";
import styled from "styled-components";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./Task";

const ColumnWrapper = styled.div`
  background-color: #f4f5f7;
  padding: 15px;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
`;

const ColumnTitle = styled.h3`
  margin: 0 0 10px;
  text-align: center;
`;

const Column = ({ columnId, columns, setColumns, deleteTask, toggleTaskCompletion, editTask }) => {
    const mockUsers = [
        { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?u=1" },
        { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?u=2" },
        { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?u=3" },
    ];

    const assignUserToTask = (taskId, userId, columnId) => {
        setColumns((prevColumns) => ({
          ...prevColumns,
          [columnId]: {
            ...prevColumns[columnId],
            tasks: prevColumns[columnId].tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    assignedUsers: [...new Set([...(task.assignedUsers || []), userId])],
                  }
                : task
            ),
          },
        }));
    };
      
  const { setNodeRef } = useDroppable({ id: columnId });
    // console.log(columns[columnId].assignedUsers)
  return (
    <ColumnWrapper ref={setNodeRef}>
      <ColumnTitle>{columns[columnId].title}</ColumnTitle>
      <SortableContext items={columns[columnId].tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        {columns[columnId].tasks.map((task) => (
          <SortableTask
            key={task.id}
            id={task.id}
            task={task}
            columnId={columnId}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
            columns={columns}
            users = {mockUsers}
            assignUserToTask={assignUserToTask}
          />
        ))}
      </SortableContext>
    </ColumnWrapper>
  );
};

export default Column;
