
import React from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { useKanban } from '../context/KanbanContext';
import Column from './Column';
import {
  ColumnsContainer,
  ColumnWrapper,
  AddColumnButton,
  Input,
  ConfirmDialog,
  ConfirmBox,
  ConfirmButton,
  CancelButton,
  ModalOverlay,
  ModalContainer,
  ModalButton,
  ColumnTitle,
  ColumnActions,
  RenameButton,
  DateInputWithIcon
} from '../Style Component/KanbanBoard.js';




const KanbanBoard = () => {
  const {
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
  } = useKanban(); // Get state from context
  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const addColumn = () => {
    if (!newColumnName.trim()) {
      alert('Column name cannot be empty!');
      return;
    }
    const newColumnId = `column-${Date.now()}`;
    setColumns((prevColumns) => ({
      ...prevColumns,
      [newColumnId]: {
        title: newColumnName,
        tasks: [], // Initialize with an empty array of tasks
      },
    }));
    setNewColumnName(''); // Clear the input for the new column name
    setIsModalOpen(false); // Close the modal or input UI
  };
  

  const handleRename = (columnId) => {
    if (renameValue.trim() === '') return;
    setColumns((prev) => ({
      ...prev,
      [columnId]: { ...prev[columnId], title: renameValue },
    }));
    setIsRenaming(null);
    setRenameValue('');
  };

  // Show confirmation dialog for removing column
  const handleRemoveColumnClick = (columnId) => {
    setColumnToRemove(columnId); // Set the column to remove
    setShowConfirm(true); // Show the confirmation dialog
  };

  const confirmRemoveColumn = () => {
    setColumns((prev) => {
      const newCols = { ...prev }; // Create a shallow copy of the previous columns
      delete newCols[columnToRemove]; // Delete the column with the specified columnId
      return newCols; // Return the updated columns object
    });
    setShowConfirm(false); // Close the confirmation dialog
  };


  const cancelRemoveColumn = () => {
    setShowConfirm(false);
    setColumnToRemove(null);
  };

  const addTask = (columnId, taskDetails) => {
    if (!taskDetails.title.trim() || !taskDetails.description.trim() || !taskDetails.dueDate.trim()) {
      alert('All task fields are required!');
      return;
    }
    // console.log(taskDetails)
  
    const newTask = {
      id: `task-${Date.now()}`, // Generate a unique ID for the task
      title: taskDetails.title,
      description: taskDetails.description,
      dueDate: taskDetails.dueDate,
      completed: false,
      assignedUsers:taskDetails.id
    
    };
  
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        tasks: [...prevColumns[columnId].tasks, newTask], // Append the new task to the existing tasks
      },
    }));

    // console.log(columns)
  
    setTaskToAdd({ title: '', description: '', dueDate: '' }); // Clear the input fields
    setSelectedColumnId(null); // Close the modal or reset selection
    setAssignedUsersId('');
  };
  
  
  const saveEditedTask = () => {
    const { columnId, id, title, description, dueDate, assignedUsers } = editingTask;
  
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      alert("All fields are required to save the task.");
      return;
    }
  
    setColumns((prevColumns) => {
      const updatedTasks = prevColumns[columnId].tasks.map((task) =>
        task.id === id
          ? { ...task, title, description, dueDate, assignedUsers } // Update task details
          : task
      );
      return {
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          tasks: updatedTasks,
        },
      };
    });
  
    setEditingTask(null); // Clear editing state and close modal
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!active || !over) return;
  
    const activeTask = findTaskById(active.id);
    const overColumnId = findColumnByDroppableId(over.id);
  
    if (!activeTask || !overColumnId) return;
  
    updateTaskOrder(activeTask, overColumnId);
  };
  
  const findTaskById = (taskId) => {
    for (const columnId in columns) {
      const task = columns[columnId].tasks.find(task => task.id === taskId);
      if (task) {
        return { task, columnId };
      }
    }
    return null;
  };
  
  const findColumnByDroppableId = (droppableId) => {
    return droppableId in columns ? droppableId : null;
  };
  
  const updateTaskOrder = (activeTask, destinationColumnId) => {
    const newColumns = { ...columns };
  
    const activeColumnTasks = newColumns[activeTask.columnId].tasks;
  
    // Remove task from its original column
    const activeTaskIndex = activeColumnTasks.findIndex(task => task.id === activeTask.task.id);
    if (activeTaskIndex === -1) return;
    const [movedTask] = activeColumnTasks.splice(activeTaskIndex, 1);
  
    // Add task to the destination column
    if (!newColumns[destinationColumnId].tasks) {
      newColumns[destinationColumnId].tasks = [];
    }
    newColumns[destinationColumnId].tasks.push(movedTask);
  
    setColumns(newColumns);
  };

  
  

  return (
    <div>
        {/* <AddColumnButton onClick={() => setIsModalOpen(true)}>Add Column</AddColumnButton> */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <ColumnsContainer>
          {Object.keys(columns).map((columnId) => (
            <ColumnWrapper key={columnId}>
                <ColumnTitle>
              {isRenaming === columnId ? (
                <div>
                  <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    placeholder="Rename column"
                  />
                  <button onClick={() => handleRename(columnId)}>Save</button>
                </div>
              ) : (
                  <>
                    {columns[columnId]?.title}
                    <ColumnActions>
                        <RenameButton onClick={() => { setIsRenaming(columnId); setRenameValue(columns[columnId]?.title); }}>
                        <FaEdit size={20} />
                        </RenameButton>
                        <button onClick={() => handleRemoveColumnClick(columnId)}>
                          <FaTrash size={15} />
                        </button>
                    </ColumnActions>
                  </>
              )}
              </ColumnTitle>
              <Column
                 key={columnId}
                 columnId={columnId}
              />
              <AddColumnButton onClick={() => setSelectedColumnId(columnId)} >Add Task</AddColumnButton>
            </ColumnWrapper>
          ))}
        </ColumnsContainer>
      </DndContext>

      

      {isModalOpen && (
        <ConfirmDialog>
          <ConfirmBox>
            <h3>Add New Column</h3>
            <Input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Column name"
            />
            <div>
              <ConfirmButton onClick={addColumn}>Add</ConfirmButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
            </div>
          </ConfirmBox>
        </ConfirmDialog>
      )}

      {showConfirm && (
        <ConfirmDialog>
          <ConfirmBox>
            <p>Are you sure you want to delete this column?</p>
            <ConfirmButton onClick={confirmRemoveColumn}>Yes</ConfirmButton>
            <CancelButton onClick={cancelRemoveColumn}>No</CancelButton>
          </ConfirmBox>
        </ConfirmDialog>
      )}



    {selectedColumnId && (
        <ModalOverlay>
          <ModalContainer>
            <h3>Add New Task</h3>
            {/* Task Title */}
            <Input
              type="text"
              value={taskToAdd}
              onChange={(e) => setTaskToAdd(e.target.value)}
              placeholder="Enter task title"
            />
            {/* Task Description */}
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
                resize: 'vertical',
                color: 'white', // Text color
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Background color
                outline: 'none', // To remove any default focus outline
              }}
              
            />
            {/* Task Due Date */}
            <DateInputWithIcon>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
              <FaCalendarAlt className="icon" />
            </DateInputWithIcon>

            <Input 
                type='text'
                value = {assignedUsersId}
                placeholder="Enter Assign Users Ids"
                onChange={(e) => setAssignedUsersId(e.target.value)}
            />
            {/* Action Buttons */}
            <div>
              <ModalButton
                onClick={() => {
                  addTask(selectedColumnId, {
                    title: taskToAdd,
                    description: taskDescription,
                    dueDate: taskDueDate,
                    id: assignedUsersId,
                  });
                  setTaskToAdd(''); // Reset fields
                  setTaskDescription('');
                  setTaskDueDate('');
                  setSelectedColumnId(null); // Close modal
                }}
              >
                Add Task
              </ModalButton>
              <ModalButton
                onClick={() => {
                  setTaskToAdd('');
                  setTaskDescription('');
                  setTaskDueDate('');
                  setSelectedColumnId(null);
                }}
              >
                Cancel
              </ModalButton>
            </div>
          </ModalContainer>
        </ModalOverlay>
      )}

      {editingTask && (
        <ModalOverlay>
          <ModalContainer>
            <h3>Edit Task</h3>
            {/* Task Title */}
            <Input
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              placeholder="Enter task title"
            />
            {/* Task Description */}
            <textarea
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
              placeholder="Enter task description"
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
                resize: 'vertical',
                color: 'white', // Text color
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Background color
                outline: 'none', // To remove any default focus outline
              }}
            />
            {/* Task Due Date */}
            <Input
              type="date"
              value={editingTask.dueDate}
              onChange={(e) =>
                setEditingTask({ ...editingTask, dueDate: e.target.value })
              }
            />
            <Input 
                type='text'
                value = {editingTask.assignedUsers}
                placeholder="Enter Assign Users Ids"
                onChange={(e) => setEditingTask({...editingTask,assignedUsers:e.target.value})}
            />
             
            {/* Action Buttons */}
            <div>
              <ModalButton onClick={saveEditedTask}>Save</ModalButton>
              <ModalButton onClick={() => setEditingTask(null)}>Cancel</ModalButton>
            </div>
          </ModalContainer>
        </ModalOverlay>
      )}
    </div>
  );
};

export default KanbanBoard;

