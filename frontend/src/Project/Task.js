
// export default SortableTask;
import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useKanban } from "../context/KanbanContext";

const TaskWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(1, 1, 1, 1);
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
`;

const TaskTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 8px 0;
  font-size: 14px;
  color: #666;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
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

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AssignedUsers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
`;

const SortableTask = ({
    id,
    task,
    columnId,
    assignUserToTask,
  }) => {
    const {columns,setEditingTask,setColumns}= useKanban();
    const users = [
      { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?u=1" },
      { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?u=2" },
      { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?u=3" },
  ];
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id,
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const deleteTask = (columnId, taskId) => {
      setColumns((prevColumns) => ({
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          tasks: prevColumns[columnId].tasks.filter((task) => task.id !== taskId),
        },
      }));
    };
    
    const toggleTaskCompletion = (columnId, taskId) => {
      setColumns((prevColumns) => {
        const updatedTasks = prevColumns[columnId].tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        return {
          ...prevColumns,
          [columnId]: {
            ...prevColumns[columnId],
            tasks: updatedTasks,
          },
        };
      });
    };
    
    const editTask = (columnId, taskId) => {
      const task = columns[columnId]?.tasks.find((t) => t.id === taskId);
      if (task) {
        setEditingTask({ ...task, columnId }); // Pass task details and columnId to editing state
      } else {
        alert("Task not found.");
      } 
    };
  
    const assignedUsers = assignUserToTask
      .map((element) => users.find((user) => element == user.id)) // Find user objects
      .filter((user) => user !== undefined); // Filter out undefined users      
  
  
    return (
      <TaskWrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TaskDetails>
          <TaskTitleWrapper>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskActions>
              <TaskButton onClick={(e) => toggleTaskCompletion(columnId, task.id)}>
                {task.completed ? <FaCheck /> : "Complete"}
              </TaskButton>
              <TaskButton onClick={(e) => editTask(columnId, task.id)}>
                <FaEdit />
              </TaskButton>
              <TaskButton onClick={(e) => deleteTask(columnId, task.id)}>
                <FaTrash />
              </TaskButton>
            </TaskActions>
          </TaskTitleWrapper>
          <TaskDescription>{task.description}</TaskDescription>
          <small>Due: {task.dueDate}</small>
          <AssignedUsers>
          {assignedUsers.map((user) => (
            <UserAvatar key={user.id} src={user.avatar} title={user.name} />
          ))}
          </AssignedUsers>
        </TaskDetails>
      </TaskWrapper>
    );
  };
  
  export default SortableTask;
  