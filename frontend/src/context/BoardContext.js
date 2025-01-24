// src/context/KanbanContext.js
import React, { createContext, useContext, useState } from 'react';

const KanbanContext = createContext();

export const useKanbanContext = () => useContext(KanbanContext);

export const KanbanProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }],
    },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ]);

  const addTask = (columnId, taskTitle) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, { id: Date.now(), title: taskTitle }] }
          : column
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
          : column
      )
    );
  };

  const editTask = (columnId, taskId, newTitle) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : column
      )
    );
  };

  return (
    <KanbanContext.Provider value={{ columns, addTask, deleteTask, editTask }}>
      {children}
    </KanbanContext.Provider>
  );
};
