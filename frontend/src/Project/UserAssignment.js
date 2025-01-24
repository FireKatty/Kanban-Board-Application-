import React, { useState } from "react";
import styled from "styled-components";
import SortableTask from "./Task";

const AppWrapper = styled.div`
  padding: 20px;
`;

const mockUsers = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?u=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?u=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?u=3" },
];

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Complete the UI design.",
    dueDate: "2025-01-31",
    completed: false,
    assignedUsers: [1],
  },
  {
    id: 2,
    title: "Task 2",
    description: "Implement drag-and-drop.",
    dueDate: "2025-02-01",
    completed: false,
    assignedUsers: [],
  },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskCompletion = (columnId, taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (columnId, taskId) => {
    const newTitle = prompt("Edit Task Title:");
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle || task.title } : task
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const assignUserToTask = (taskId, userId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, assignedUsers: [...new Set([...task.assignedUsers, userId])] }
          : task
      )
    );
  };

  return (
    <AppWrapper>
      {tasks.map((task) => (
        <SortableTask
          key={task.id}
          id={task.id}
          task={task}
          columnId="1"
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
          users={mockUsers}
          assignUserToTask={assignUserToTask}
        />
      ))}
    </AppWrapper>
  );
};

export default App;
