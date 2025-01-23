import React, { createContext, useState } from "react";

// Create the context
export const BoardContext = createContext();

// Context Provider
export const BoardProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    {
      id: "col-1",
      name: "To Do",
      tasks: [
        { id: "task-1", name: "Task 1", description: "Description 1", dueDate: "2025-01-25" },
        { id: "task-2", name: "Task 2", description: "Description 2", dueDate: "2025-01-26" },
      ],
    },
    {
      id: "col-2",
      name: "In Progress",
      tasks: [],
    },
    {
      id: "col-3",
      name: "Done",
      tasks: [],
    },
  ]);

  // Define all context methods here
  const addColumn = (name) => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { id: `col-${Date.now()}`, name, tasks: [] },
    ]);
  };

  const renameColumn = (id, newName) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => (col.id === id ? { ...col, name: newName } : col))
    );
  };

  const deleteColumn = (id) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.id !== id));
  };

  const addTask = (columnId, task) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, { ...task, id: `task-${Date.now()}` }] }
          : col
      )
    );
  };

  const moveTask = (sourceColId, targetColId, taskId) => {
    let taskToMove = null;

    const updatedColumns = columns.map((col) => {
      if (col.id === sourceColId) {
        const taskIndex = col.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex > -1) {
          taskToMove = col.tasks[taskIndex];
          col.tasks.splice(taskIndex, 1);
        }
      }
      if (col.id === targetColId && taskToMove) {
        return { ...col, tasks: [...col.tasks, taskToMove] };
      }
      return col;
    });

    setColumns(updatedColumns);
  };

  return (
    <BoardContext.Provider
      value={{
        columns,
        addColumn,
        renameColumn,
        deleteColumn,
        addTask,
        moveTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};