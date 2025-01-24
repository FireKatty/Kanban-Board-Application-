import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Styled Components
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

// Task Component (Sortable)
const SortableTask = ({ id, task, columnId, deleteTask, toggleTaskCompletion, editTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: { type: 'task', columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskWrapper ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} style={{ cursor: 'grab', marginRight: '10px' }}>
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

// Column Component (Drag and Drop)
const Column = ({ columnId, column, columns, setColumns, deleteTask, toggleTaskCompletion, editTask }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Check if a task was dragged and dropped
    if (over && active.data.current.type === 'task') {
      const activeColumnId = active.data.current.columnId;
      const overColumnId = over.id;

      // Check if task is dropped in another column
      if (activeColumnId !== overColumnId) {
        const task = columns[activeColumnId]?.tasks.find((t) => t.id === active.id);

        // Ensure task exists
        if (!task) return;

        // Remove task from source column
        const updatedSourceColumn = {
          ...columns[activeColumnId],
          tasks: columns[activeColumnId].tasks.filter((t) => t.id !== active.id),
        };

        // Add task to target column
        const updatedTargetColumn = {
          ...columns[overColumnId],
          tasks: [...columns[overColumnId].tasks, task],
        };

        // Update columns state
        setColumns((prevColumns) => ({
          ...prevColumns,
          [activeColumnId]: updatedSourceColumn,
          [overColumnId]: updatedTargetColumn,
        }));
      }
    }
  };

  return (
    <ColumnWrapper>
      <ColumnTitle>{column.title}</ColumnTitle>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={column.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
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

// Parent Component
const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    'column-1': {
      title: 'To Do',
      tasks: [
        { id: 'task-1', title: 'Task 1', description: 'Description of Task 1', dueDate: '2025-01-30', completed: false },
        { id: 'task-2', title: 'Task 2', description: 'Description of Task 2', dueDate: '2025-01-31', completed: false },
      ],
    },
    'column-2': {
      title: 'In Progress',
      tasks: [
        { id: 'task-3', title: 'Task 3', description: 'Description of Task 3', dueDate: '2025-02-01', completed: false },
      ],
    },
    'column-3': {
      title: 'Done',
      tasks: [],
    },
  });

  const deleteTask = (columnId, taskId) => {
    setColumns((prevColumns) => {
      const updatedTasks = prevColumns[columnId].tasks.filter((task) => task.id !== taskId);
      return {
        ...prevColumns,
        [columnId]: { ...prevColumns[columnId], tasks: updatedTasks },
      };
    });
  };

  const toggleTaskCompletion = (columnId, taskId) => {
    setColumns((prevColumns) => {
      const updatedTasks = prevColumns[columnId].tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return {
        ...prevColumns,
        [columnId]: { ...prevColumns[columnId], tasks: updatedTasks },
      };
    });
  };

  const editTask = (columnId, taskId) => {
    // Logic for editing task (e.g., open a modal)
    console.log('Edit Task:', columnId, taskId);
  };

  return (
    <div style={{ display: 'flex', overflowX: 'auto' }}>
      {Object.keys(columns).map((columnId) => (
        <Column
          key={columnId}
          columnId={columnId}
          column={columns[columnId]}
          columns={columns}
          setColumns={setColumns}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
