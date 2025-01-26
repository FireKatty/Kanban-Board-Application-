// KanbanContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const KanbanContext = createContext();

// Custom hook to use the Kanban context
export const useKanban = () => {
  return useContext(KanbanContext);
};

// KanbanProvider to wrap around the components that need access to the state
export const KanbanProvider = ({ children }) => {
  const [columns, setColumns] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [isRenaming, setIsRenaming] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [columnToRemove, setColumnToRemove] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToAdd, setTaskToAdd] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [assignedUsersId, setAssignedUsersId] = useState('');
  const [taskid, setTaskid] = useState('');
  const [task,setTask] = useState(null);
  const [assignUserToTask,setAssignUserToTask] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  return (
    <KanbanContext.Provider value={{
      columns, setColumns,
      isModalOpen, setIsModalOpen,
      newColumnName, setNewColumnName,
      isRenaming, setIsRenaming,
      renameValue, setRenameValue,
      showConfirm, setShowConfirm,
      columnToRemove, setColumnToRemove,
      selectedColumnId, setSelectedColumnId,
      editingTask, setEditingTask,
      taskToAdd, setTaskToAdd,
      taskDescription, setTaskDescription,
      taskDueDate, setTaskDueDate,
      assignedUsersId, setAssignedUsersId,
      taskid, setTaskid,
      task,setTask,
      assignUserToTask,setAssignUserToTask,
      searchTerm, setSearchTerm,
      searchResults, setSearchResults
    }}>
      {children}
    </KanbanContext.Provider>
  );
};
