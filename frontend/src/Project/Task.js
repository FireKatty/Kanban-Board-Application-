// import React from "react";
// import styled from "styled-components";
// import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// const TaskWrapper = styled.div`
//   background-color: white;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 10px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 1);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
// `;

// const TaskDetails = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const TaskTitle = styled.h4`
//   margin: 0;
//   font-size: 16px;
// `;

// const TaskDescription = styled.p`
//   margin: 5px 0;
//   font-size: 14px;
//   color: #555;
// `;

// const TaskActions = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const TaskButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 5px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 14px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const SortableTask = ({ id, task, columnId, deleteTask, toggleTaskCompletion, editTask }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//       id,
//       data: { columnId },
//     });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//     };

//     return (
//       <TaskWrapper ref={setNodeRef} style={style}>
//         <div {...attributes} {...listeners} style={{ cursor: 'grab', marginRight: '10px' }}>
//           <FaEdit style={{ cursor: 'grab' }} />
//         </div>
//         <TaskDetails>
//           <TaskTitle>{task.title}</TaskTitle>
//           <TaskDescription>{task.description}</TaskDescription>
//           <small>Due: {task.dueDate}</small>
//         </TaskDetails>
//         <TaskActions>
//           <TaskButton
//             onClick={(e) => { e.stopPropagation(); toggleTaskCompletion(columnId, task.id); }}
//             aria-label={task.completed ? "Undo completion" : "Mark as complete"}
//           >
//             {task.completed ? <FaCheck /> : 'Complete'}
//           </TaskButton>
//           <TaskButton
//             onClick={(e) => { e.stopPropagation(); editTask(columnId, task.id); }}
//             aria-label="Edit task"
//           >
//             <FaEdit />
//           </TaskButton>
//           <TaskButton
//             onClick={(e) => { e.stopPropagation(); deleteTask(columnId, task.id); }}
//             aria-label="Delete task"
//           >
//             <FaTrash />
//           </TaskButton>
//         </TaskActions>
//       </TaskWrapper>
//     );
// };

// export default SortableTask;

import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(1,1,1, 1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  overflow-wrap: anywhere;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const TaskTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TaskTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display : flex;
`;

const TaskDescription = styled.p`
  margin: 8px 0;
  font-size: 14px;
  color: #666;
  max-height: 60px;
  overflow-y: auto;
  padding-right: 5px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }
`;

const TaskDate = styled.small`
  font-size: 12px;
  color: #999;
  margin-top: 5px;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-start;
  margin-left:auto;

  @media (min-width: 600px) {
    align-self: center;
  }

`;

const TaskButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SortableTask = ({ id, task, columnId, deleteTask, toggleTaskCompletion, editTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskWrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ cursor: "grab" }}>
        <FaEdit />
      </div>
      <TaskDetails>
        <TaskTitle>{task.title}
        <TaskActions>
        <TaskButton onClick={(e) => { e.stopPropagation(); toggleTaskCompletion(columnId, task.id); }}>
          {task.completed ? <FaCheck /> : "Complete"}
        </TaskButton>
        <TaskButton onClick={(e) => { e.stopPropagation(); editTask(columnId, task.id); }}>
          <FaEdit />
        </TaskButton>
        <TaskButton onClick={(e) => { e.stopPropagation(); deleteTask(columnId, task.id); }}>
          <FaTrash />
        </TaskButton>
      </TaskActions>
      </TaskTitle>
        <TaskDescription>{task.description}</TaskDescription>
        <small>Due: {task.dueDate}</small>
      </TaskDetails>
      
    </TaskWrapper>
  );
};

export default SortableTask;
