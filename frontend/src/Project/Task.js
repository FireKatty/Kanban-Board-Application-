
// export default SortableTask;
import React from "react";
// import styled from "styled-components";
import { FaEdit, FaTrash, FaCheck} from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useKanban } from "../context/KanbanContext";
import { MockUsers } from "./UserList.js";
import {
  TaskWrapper,
  TaskDetails,
  TaskTitleWrapper,
  TaskTitle,
  TaskDescription,
  TaskActions,
  TaskButton,
  AssignedUsers,
  UserAvatar
} from '../Style Component/Task.js'; 


const SortableTask = ({
    id,
    task,
    columnId,
    assignUserToTask,
  }) => {
    console.log()
    const {columns,setEditingTask,setColumns}= useKanban();
  //   const users = [
  //     { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?u=1" },
  //     { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?u=2" },
  //     { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?u=3" },
  // ];
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
      .map((element) => MockUsers.find((user) => element == user.id)) // Find user objects
      .filter((user) => user !== undefined); // Filter out undefined users      
     
    return (
      <TaskWrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TaskDetails>
          <TaskTitleWrapper>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskActions>
              <TaskButton onClick={(e) => toggleTaskCompletion(columnId, task.id)}>
                {task.completed ? <FaCheck color="green" size={15} title="Complete" /> : <AiOutlineClockCircle size={15} color="red"  title="Incomplete"/>}
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
  