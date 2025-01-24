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
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const TaskButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
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
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDescription>{task.description}</TaskDescription>
        <small>Due: {task.dueDate}</small>
      </TaskDetails>
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
    </TaskWrapper>
  );
};

export default SortableTask;
