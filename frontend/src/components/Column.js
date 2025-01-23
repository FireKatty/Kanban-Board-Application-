
// import React from 'react';
// import styled from 'styled-components';
// import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

// const TaskWrapper = styled.div`
//   background-color: white;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 10px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
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

// const Column = ({ columnId, column, deleteTask, toggleTaskCompletion, editTask }) => {
//   return (
//     <div>
//       {column.tasks.map((task) => (
//         <TaskWrapper key={task.id}>
//           <TaskDetails>
//             <TaskTitle>{task.title}</TaskTitle>
//             <TaskDescription>{task.description}</TaskDescription>
//             <small>Due: {task.dueDate}</small>
//           </TaskDetails>
//           <TaskActions>
//             <TaskButton onClick={() => toggleTaskCompletion(columnId, task.id)}>
//               {task.completed ? <FaCheck /> : 'Complete'}
//             </TaskButton>
//             <TaskButton onClick={() => editTask(columnId, task.id)}>
//               <FaEdit />
//             </TaskButton>
//             <TaskButton onClick={() => deleteTask(columnId, task.id)}>
//               <FaTrash />
//             </TaskButton>
//           </TaskActions>
//         </TaskWrapper>
//       ))}
//     </div>
//   );
// };

// export default Column;


import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskWrapper = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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

const SortableTask = ({ id, task, columnId, deleteTask, toggleTaskCompletion, editTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskWrapper ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} style={{ cursor: 'grab', marginRight: '10px' }}>
        {/* Drag handle */}
        <FaEdit style={{ cursor: 'grab' }} />
      </div>
      <TaskDetails>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDescription>{task.description}</TaskDescription>
        <small>Due: {task.dueDate}</small>
      </TaskDetails>
      <TaskActions>
        <TaskButton
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(columnId, task.id);
          }}
        >
          {task.completed ? <FaCheck /> : 'Complete'}
        </TaskButton>
        <TaskButton
          onClick={(e) => {
            e.stopPropagation();
            editTask(columnId, task.id);
          }}
        >
          <FaEdit />
        </TaskButton>
        <TaskButton
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(columnId, task.id);
          }}
        >
          <FaTrash />
        </TaskButton>
      </TaskActions>
    </TaskWrapper>
  );
};


const Column = ({ columnId, column, setColumns, deleteTask, toggleTaskCompletion, editTask }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeColumnId = active.data.current.sortable.containerId;
    const overColumnId = over.data.current.sortable.containerId;

    if (activeColumnId === overColumnId) {
      const columnTasks = [...column.tasks];
      const oldIndex = columnTasks.findIndex((task) => task.id === active.id);
      const newIndex = columnTasks.findIndex((task) => task.id === over.id);

      columnTasks.splice(newIndex, 0, ...columnTasks.splice(oldIndex, 1));
      setColumns((prev) => ({
        ...prev,
        [activeColumnId]: {
          ...prev[activeColumnId],
          tasks: columnTasks,
        },
      }));
    } else {
      const sourceColumn = column;
      const targetColumn = overColumnId;
      const activeTask = sourceColumn.tasks.find((task) => task.id === active.id);

      setColumns((prev) => {
        const sourceTasks = sourceColumn.tasks.filter((task) => task.id !== active.id);
        const targetTasks = [...prev[targetColumn].tasks, activeTask];

        return {
          ...prev,
          [activeColumnId]: { ...sourceColumn, tasks: sourceTasks },
          [targetColumn]: { ...prev[targetColumn], tasks: targetTasks },
        };
      });
    }
  };

  return (
    <ColumnWrapper>
      <ColumnTitle>{column.title}</ColumnTitle>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <SortableTask
              key={task.id}
              id={task.id}
              task={task}
              columnId={columnId}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ColumnWrapper>
  );
};

export default Column;
