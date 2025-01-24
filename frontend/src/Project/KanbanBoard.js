
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// // import SortableItem  from './SortableItem';
// import Column from './Column';
// import { verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';


// // Styled Components
// const ColumnsContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   flex-wrap: wrap;
//   padding: 20px;
//   justify-content: flex-start;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const ColumnWrapper = styled.div`
//   width: 300px;
//   background-color: #f4f5f7;
//   padding: 15px;
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const AddColumnButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   margin-top: 10px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ColumnTitle = styled.h2`
//   font-size: 18px;
//   margin-bottom: 15px;
//   text-align: center;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ColumnActions = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const RenameButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   padding: 5px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #388e3c;
//   }
// `;

// const Input = styled.input`
//   padding: 5px;
//   margin: 5px 0;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   width: 100%;
// `;

// const ConfirmDialog = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ConfirmBox = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   text-align: center;
// `;

// const ConfirmButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const CancelButton = styled.button`
//   background-color: #f44336;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #d32f2f;
//   }
// `;

// // Modal Styles
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContainer = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ModalButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const Columns = () => {
//   const [columns, setColumns] = useState({});
//   const [columnOrder, setColumnOrder] = useState([]);
//   const [newColumnName, setNewColumnName] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isRenaming, setIsRenaming] = useState(null);
//   const [renameValue, setRenameValue] = useState('');
//   const [taskToAdd, setTaskToAdd] = useState('');
//   const [selectedColumnId, setSelectedColumnId] = useState(null);
//   const [editingTask, setEditingTask] = useState(null); // For editing a task
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskDueDate, setTaskDueDate] = useState('');
  
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [columnToRemove, setColumnToRemove] = useState(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 5,
//       },
//     })
//   );

//   const addColumn = (columnName) => {
//     const newColumnId = columnName.toLowerCase().replace(/\s+/g, '-');
//     setColumns({
//       ...columns,
//       [newColumnId]: { name: columnName, tasks: [] },
//     });
//     setColumnOrder([...columnOrder, newColumnId]);
//     setNewColumnName('');
//     setIsModalOpen(false);
//   };

//   const handleRename = (columnId) => {
//     if (renameValue.trim() === '') return;
//     setColumns((prev) => ({
//       ...prev,
//       [columnId]: { ...prev[columnId], name: renameValue },
//     }));
//     setIsRenaming(null);
//     setRenameValue('');
//   };

//   const confirmRemoveColumn = () => {
//     const newColumns = { ...columns };
//     delete newColumns[columnToRemove];
//     setColumns(newColumns);
//     setShowConfirm(false);
//   };

//   const cancelRemoveColumn = () => {
//     setShowConfirm(false);
//     setColumnToRemove(null);
//   };

//   const addTask = (columnId, taskDetails) => {
//     const newTask = {
//       id: Date.now(),
//       title: taskDetails.title,
//       description: taskDetails.description,
//       dueDate: taskDetails.dueDate,
//       completed: false,
//     };
//     const updatedColumns = { ...columns };
//     updatedColumns[columnId].tasks.push(newTask);
//     setColumns(updatedColumns);
//     setTaskToAdd(''); // Clear the input field
//     setSelectedColumnId(null); // Close the modal
//   };

//   const deleteTask = (columnId, taskId) => {
//     const updatedColumns = { ...columns };
//     updatedColumns[columnId].tasks = updatedColumns[columnId].tasks.filter(
//       (task) => task.id !== taskId
//     );
//     setColumns(updatedColumns);
//   };

//   const toggleTaskCompletion = (columnId, taskId) => {
//     const updatedColumns = { ...columns };
//     const task = updatedColumns[columnId].tasks.find((t) => t.id === taskId);
//     if (task) {
//       task.completed = !task.completed;
//       setColumns(updatedColumns);
//     }
//   };

//   const editTask = (columnId, taskId) => {
//     const task = columns[columnId].tasks.find((t) => t.id === taskId);
//     setEditingTask({ ...task, columnId });
//   };

//   const saveEditedTask = () => {
//     const { columnId, id, title, description, dueDate } = editingTask;
//     const updatedColumns = { ...columns };
//     const taskIndex = updatedColumns[columnId].tasks.findIndex((task) => task.id === id);
//     if (taskIndex > -1) {
//       updatedColumns[columnId].tasks[taskIndex] = { ...updatedColumns[columnId].tasks[taskIndex], title, description, dueDate };
//     }
//     setColumns(updatedColumns);
//     setEditingTask(null); // Close the edit modal
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
  
//     // Ensure both active and over elements exist
//     if (!active || !over) return;
  
//     if (active.id !== over.id) {
//       const sourceColumnId = active.data.current?.columnId;
//       const targetColumnId = over.data.current?.columnId;
  
//       // Ensure source and target columns exist
//       if (sourceColumnId && targetColumnId) {
//         const sourceColumn = columns[sourceColumnId];
//         const targetColumn = columns[targetColumnId];
  
//         // Find the task being dragged
//         const taskToMove = sourceColumn.tasks.find(task => task.id === active.id);
  
//         if (taskToMove) {
//           // Remove the task from the source column
//           const updatedSourceTasks = sourceColumn.tasks.filter(task => task.id !== active.id);
          
//           // Add the task to the target column
//           const updatedTargetTasks = [...targetColumn.tasks, taskToMove];
  
//           // Update the columns state
//           const updatedColumns = {
//             ...columns,
//             [sourceColumnId]: { ...sourceColumn, tasks: updatedSourceTasks },
//             [targetColumnId]: { ...targetColumn, tasks: updatedTargetTasks },
//           };
  
//           setColumns(updatedColumns);
//         }
//       }
//     }
//   };
  
  


 


  

//   return (
    // <div>
    //   <DndContext
    //     sensors={sensors}
    //     collisionDetection={closestCenter}
    //     onDragEnd={handleDragEnd}
    //     >
    //     <ColumnsContainer>
    //         {Object.keys(columns).map((columnId) => (
    //         <ColumnWrapper key={columnId}>
    //             <ColumnTitle>
    //             {isRenaming === columnId ? (
    //                 <>
    //                 <Input
    //                     value={renameValue}
    //                     onChange={(e) => setRenameValue(e.target.value)}
    //                     placeholder="New column name"
    //                 />
    //                 <RenameButton onClick={() => handleRename(columnId)}>Save</RenameButton>
    //                 </>
    //             ) : (
                    // <>
                    // {columns[columnId]?.name}
                    // <ColumnActions>
                    //     <RenameButton onClick={() => { setIsRenaming(columnId); setRenameValue(columns[columnId]?.name); }}>
                    //     <FaEdit />
                    //     </RenameButton>
                    //     <button onClick={() => { setColumns((prev) => { const newCols = { ...prev }; delete newCols[columnId]; return newCols; }); setColumnOrder((prev) => prev.filter((id) => id !== columnId)); }}>
                    //     <FaTrash />
                    //     </button>
                    // </ColumnActions>
                    // </>
    //             )}
    //             </ColumnTitle>

    //             <SortableContext items={columns[columnId].tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
    //         <Column
    //             columnId={columnId} 
    //             columns={columns}
    //             setColumns={setColumns}
    //             deleteTask={deleteTask}
    //             toggleTaskCompletion={toggleTaskCompletion}
    //             editTask={editTask}
    //         />
    //         </SortableContext>

    //             <AddColumnButton onClick={() => setSelectedColumnId(columnId)}>Add Task</AddColumnButton>
    //         </ColumnWrapper>
    //         ))}
    //     </ColumnsContainer>
    //     </DndContext>

    //   <AddColumnButton onClick={() => setIsModalOpen(true)}>Add Column</AddColumnButton>

    //   {showConfirm && (
    //     <ConfirmDialog>
    //       <ConfirmBox>
    //         <p>Are you sure you want to remove this column?</p>
    //         <ConfirmButton onClick={confirmRemoveColumn}>Yes</ConfirmButton>
    //         <CancelButton onClick={cancelRemoveColumn}>No</CancelButton>
    //       </ConfirmBox>
    //     </ConfirmDialog>
    //   )}

    //   {isModalOpen && (
    //     <ModalOverlay>
    //       <ModalContainer>
    //         <h3>Add New Column</h3>
    //         <Input
    //           type="text"
    //           value={newColumnName}
    //           onChange={(e) => setNewColumnName(e.target.value)}
    //           placeholder="Enter column name"
    //         />
    //         <div>
    //           <ModalButton onClick={() => addColumn(newColumnName)}>Add Column</ModalButton>
    //           <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
    //         </div>
    //       </ModalContainer>
    //     </ModalOverlay>
    //   )}


    //   {selectedColumnId && (
    //     <ModalOverlay>
    //       <ModalContainer>
    //         <h3>Add New Task</h3>
    //         {/* Task Title */}
    //         <Input
    //           type="text"
    //           value={taskToAdd}
    //           onChange={(e) => setTaskToAdd(e.target.value)}
    //           placeholder="Enter task title"
    //         />
    //         {/* Task Description */}
    //         <textarea
    //           value={taskDescription}
    //           onChange={(e) => setTaskDescription(e.target.value)}
    //           placeholder="Enter task description"
    //           style={{
    //             width: '100%',
    //             height: '100px',
    //             padding: '10px',
    //             margin: '10px 0',
    //             borderRadius: '5px',
    //             border: '1px solid #ccc',
    //             resize: 'vertical',
    //           }}
    //         />
    //         {/* Task Due Date */}
    //         <Input
    //           type="date"
    //           value={taskDueDate}
    //           onChange={(e) => setTaskDueDate(e.target.value)}
    //         />
    //         {/* Action Buttons */}
    //         <div>
    //           <ModalButton
    //             onClick={() => {
    //               addTask(selectedColumnId, {
    //                 title: taskToAdd,
    //                 description: taskDescription,
    //                 dueDate: taskDueDate,
    //               });
    //               setTaskToAdd(''); // Reset fields
    //               setTaskDescription('');
    //               setTaskDueDate('');
    //               setSelectedColumnId(null); // Close modal
    //             }}
    //           >
    //             Add Task
    //           </ModalButton>
    //           <ModalButton
    //             onClick={() => {
    //               setTaskToAdd('');
    //               setTaskDescription('');
    //               setTaskDueDate('');
    //               setSelectedColumnId(null);
    //             }}
    //           >
    //             Cancel
    //           </ModalButton>
    //         </div>
    //       </ModalContainer>
    //     </ModalOverlay>
    //   )}

    //   {editingTask && (
    //     <ModalOverlay>
    //       <ModalContainer>
    //         <h3>Edit Task</h3>
    //         {/* Task Title */}
    //         <Input
    //           type="text"
    //           value={editingTask.title}
    //           onChange={(e) =>
    //             setEditingTask({ ...editingTask, title: e.target.value })
    //           }
    //           placeholder="Enter task title"
    //         />
    //         {/* Task Description */}
    //         <textarea
    //           value={editingTask.description}
    //           onChange={(e) =>
    //             setEditingTask({ ...editingTask, description: e.target.value })
    //           }
    //           placeholder="Enter task description"
    //           style={{
    //             width: '100%',
    //             height: '100px',
    //             padding: '10px',
    //             margin: '10px 0',
    //             borderRadius: '5px',
    //             border: '1px solid #ccc',
    //             resize: 'vertical',
    //           }}
    //         />
    //         {/* Task Due Date */}
    //         <Input
    //           type="date"
    //           value={editingTask.dueDate}
    //           onChange={(e) =>
    //             setEditingTask({ ...editingTask, dueDate: e.target.value })
    //           }
    //         />
    //         {/* Action Buttons */}
    //         <div>
    //           <ModalButton onClick={saveEditedTask}>Save</ModalButton>
    //           <ModalButton onClick={() => setEditingTask(null)}>Cancel</ModalButton>
    //         </div>
    //       </ModalContainer>
    //     </ModalOverlay>
    //   )}

    // </div>
//   );
// };

// export default Columns;


// import React, { useState } from 'react';
// import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import styled from 'styled-components';
// import Column from './Column';


// // Styled Components
// const ColumnsContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   flex-wrap: wrap;
//   padding: 20px;
//   justify-content: flex-start;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const ColumnWrapper = styled.div`
//   width: 300px;
//   background-color: #f4f5f7;
//   padding: 15px;
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const AddColumnButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   margin-top: 10px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ColumnTitle = styled.h2`
//   font-size: 18px;
//   margin-bottom: 15px;
//   text-align: center;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ColumnActions = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const RenameButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   padding: 5px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #388e3c;
//   }
// `;

// const Input = styled.input`
//   padding: 5px;
//   margin: 5px 0;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   width: 100%;
// `;

// const ConfirmDialog = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ConfirmBox = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   text-align: center;
// `;

// const ConfirmButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const CancelButton = styled.button`
//   background-color: #f44336;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #d32f2f;
//   }
// `;

// // Modal Styles
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContainer = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ModalButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const KanbanBoard = () => {
//   const [columns, setColumns] = useState({
//     column1: {
//       title: 'To Do',
//       tasks: [
//         { id: 'task1', title: 'Task 1', description: 'Description of task 1', dueDate: '2025-01-31', completed: false },
//         { id: 'task2', title: 'Task 2', description: 'Description of task 2', dueDate: '2025-02-05', completed: false },
//       ],
//     },
//     column2: {
//       title: 'In Progress',
//       tasks: [
//         { id: 'task3', title: 'Task 3', description: 'Description of task 3', dueDate: '2025-02-01', completed: false },
//       ],
//     },
//     column3: {
//       title: 'Done',
//       tasks: [
//         { id: 'task4', title: 'Task 4', description: 'Description of task 3', dueDate: '2025-02-01', completed: false },
//       ],
//     },
//   });



//   const handleRename = (columnId) => {
//     if (renameValue.trim() === '') return;
//     setColumns((prev) => ({
//       ...prev,
//       [columnId]: { ...prev[columnId], name: renameValue },
//     }));
//     setIsRenaming(null);
//     setRenameValue('');
//   };

//   const confirmRemoveColumn = () => {
//     const newColumns = { ...columns };
//     delete newColumns[columnToRemove];
//     setColumns(newColumns);
//     setShowConfirm(false);
//   };

//   const cancelRemoveColumn = () => {
//     setShowConfirm(false);
//     setColumnToRemove(null);
//   };

//   const addTask = (columnId, taskDetails) => {
//     const newTask = {
//       id: Date.now(),
//       title: taskDetails.title,
//       description: taskDetails.description,
//       dueDate: taskDetails.dueDate,
//       completed: false,
//     };
//     const updatedColumns = { ...columns };
//     updatedColumns[columnId].tasks.push(newTask);
//     setColumns(updatedColumns);
//     setTaskToAdd(''); // Clear the input field
//     setSelectedColumnId(null); // Close the modal
//   };

// //   const deleteTask = (columnId, taskId) => {
// //     const updatedColumns = { ...columns };
// //     updatedColumns[columnId].tasks = updatedColumns[columnId].tasks.filter(
// //       (task) => task.id !== taskId
// //     );
// //     setColumns(updatedColumns);
// //   };

// //   const toggleTaskCompletion = (columnId, taskId) => {
// //     const updatedColumns = { ...columns };
// //     const task = updatedColumns[columnId].tasks.find((t) => t.id === taskId);
// //     if (task) {
// //       task.completed = !task.completed;
// //       setColumns(updatedColumns);
// //     }
// //   };

// //   const editTask = (columnId, taskId) => {
// //     const task = columns[columnId].tasks.find((t) => t.id === taskId);
// //     setEditingTask({ ...task, columnId });
// //   };

//   const saveEditedTask = () => {
//     const { columnId, id, title, description, dueDate } = editingTask;
//     const updatedColumns = { ...columns };
//     const taskIndex = updatedColumns[columnId].tasks.findIndex((task) => task.id === id);
//     if (taskIndex > -1) {
//       updatedColumns[columnId].tasks[taskIndex] = { ...updatedColumns[columnId].tasks[taskIndex], title, description, dueDate };
//     }
//     setColumns(updatedColumns);
//     setEditingTask(null); // Close the edit modal
//   };


//   const sensors = useSensors(
//       useSensor(PointerSensor, {
//         activationConstraint: {
//           distance: 5,
//         },
//       })
//     );



   

    // const handleDragEnd = (event) => {
    //     const { active, over } = event;
      
    //     if (!active || !over) return;
      
    //     const activeTask = findTaskById(active.id);
    //     const overColumnId = findColumnByDroppableId(over.id);
      
    //     if (!activeTask || !overColumnId) return;
      
    //     updateTaskOrder(activeTask, overColumnId);
    //   };
      
    //   const findTaskById = (taskId) => {
    //     for (const columnId in columns) {
    //       const task = columns[columnId].tasks.find(task => task.id === taskId);
    //       if (task) {
    //         return { task, columnId };
    //       }
    //     }
    //     return null;
    //   };
      
    //   const findColumnByDroppableId = (droppableId) => {
    //     return droppableId in columns ? droppableId : null;
    //   };
      
    //   const updateTaskOrder = (activeTask, destinationColumnId) => {
    //     const newColumns = { ...columns };
      
    //     const activeColumnTasks = newColumns[activeTask.columnId].tasks;
      
    //     // Remove task from its original column
    //     const activeTaskIndex = activeColumnTasks.findIndex(task => task.id === activeTask.task.id);
    //     if (activeTaskIndex === -1) return;
    //     const [movedTask] = activeColumnTasks.splice(activeTaskIndex, 1);
      
    //     // Add task to the destination column
    //     if (!newColumns[destinationColumnId].tasks) {
    //       newColumns[destinationColumnId].tasks = [];
    //     }
    //     newColumns[destinationColumnId].tasks.push(movedTask);
      
    //     setColumns(newColumns);
    //   };
      

//   const toggleTaskCompletion = (columnId, taskId) => {
//     const newColumns = { ...columns };
//     const task = newColumns[columnId].tasks.find(task => task.id === taskId);
//     if (task) {
//       task.completed = !task.completed;
//       setColumns(newColumns);
//     }
//   };

//   const deleteTask = (columnId, taskId) => {
//     const newColumns = { ...columns };
//     newColumns[columnId].tasks = newColumns[columnId].tasks.filter(task => task.id !== taskId);
//     setColumns(newColumns);
//   };

//   const editTask = (columnId, taskId) => {
//     // Implement task editing logic here (you can show a modal, etc.)
//     alert(`Editing task ${taskId} in column ${columnId}`);
//   };

//   return (
//     <div>
//         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

//         <ColumnsContainer>
//             {Object.keys(columns).map((columnId) => (
//                 <ColumnWrapper key={columnId}>
//                     <ColumnTitle>
//                     {isRenaming === columnId ?(
//                         <>
//                         <Input
//                             value={renameValue}
//                             onChange={(e) => setRenameValue(e.target.value)}
//                             placeholder="New column name"
//                         />
//                         <RenameButton onClick={() => handleRename(columnId)}>Save</RenameButton>
//                         </>
//                     ) : (
//                         <>
//                         {columns[columnId]?.name}
//                         <ColumnActions>
//                             <RenameButton onClick={() => { setIsRenaming(columnId); setRenameValue(columns[columnId]?.name); }}>
//                             <FaEdit />
//                             </RenameButton>
//                             <button onClick={() => { setColumns((prev) => { const newCols = { ...prev }; delete newCols[columnId]; return newCols; }); setColumnOrder((prev) => prev.filter((id) => id !== columnId)); }}>
//                             <FaTrash />
//                             </button>
//                         </ColumnActions>
//                         </>
//                     )};
//                     </ColumnTitle>
//                 <Column
                    // key={columnId}
                    // columnId={columnId}
                    // columns={columns}
                    // setColumns={setColumns}
                    // deleteTask={deleteTask}
                    // toggleTaskCompletion={toggleTaskCompletion}
                    // editTask={editTask}
//                 />
                // <AddColumnButton onClick={() => setSelectedColumnId(columnId)}>Add Task</AddColumnButton>
//             </ColumnWrapper>
//             ))}

//             </ColumnsContainer>
//         </DndContext>

//         <AddColumnButton onClick={() => setIsModalOpen(true)}>Add Column</AddColumnButton>

//       {showConfirm && (
//         <ConfirmDialog>
//           <ConfirmBox>
//             <p>Are you sure you want to remove this column?</p>
//             <ConfirmButton onClick={confirmRemoveColumn}>Yes</ConfirmButton>
//             <CancelButton onClick={cancelRemoveColumn}>No</CancelButton>
//           </ConfirmBox>
//         </ConfirmDialog>
//       )}

//       {isModalOpen && (
//         <ModalOverlay>
//           <ModalContainer>
//             <h3>Add New Column</h3>
//             <Input
//               type="text"
//               value={newColumnName}
//               onChange={(e) => setNewColumnName(e.target.value)}
//               placeholder="Enter column name"
//             />
//             <div>
//               <ModalButton onClick={() => addColumn(newColumnName)}>Add Column</ModalButton>
//               <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
//             </div>
//           </ModalContainer>
//         </ModalOverlay>
//       )}


    //   {selectedColumnId && (
    //     <ModalOverlay>
    //       <ModalContainer>
    //         <h3>Add New Task</h3>
    //         {/* Task Title */}
    //         <Input
    //           type="text"
    //           value={taskToAdd}
    //           onChange={(e) => setTaskToAdd(e.target.value)}
    //           placeholder="Enter task title"
    //         />
    //         {/* Task Description */}
    //         <textarea
    //           value={taskDescription}
    //           onChange={(e) => setTaskDescription(e.target.value)}
    //           placeholder="Enter task description"
    //           style={{
    //             width: '100%',
    //             height: '100px',
    //             padding: '10px',
    //             margin: '10px 0',
    //             borderRadius: '5px',
    //             border: '1px solid #ccc',
    //             resize: 'vertical',
    //           }}
    //         />
    //         {/* Task Due Date */}
    //         <Input
    //           type="date"
    //           value={taskDueDate}
    //           onChange={(e) => setTaskDueDate(e.target.value)}
    //         />
    //         {/* Action Buttons */}
    //         <div>
    //           <ModalButton
    //             onClick={() => {
    //               addTask(selectedColumnId, {
    //                 title: taskToAdd,
    //                 description: taskDescription,
    //                 dueDate: taskDueDate,
    //               });
    //               setTaskToAdd(''); // Reset fields
    //               setTaskDescription('');
    //               setTaskDueDate('');
    //               setSelectedColumnId(null); // Close modal
    //             }}
    //           >
    //             Add Task
    //           </ModalButton>
    //           <ModalButton
    //             onClick={() => {
    //               setTaskToAdd('');
    //               setTaskDescription('');
    //               setTaskDueDate('');
    //               setSelectedColumnId(null);
    //             }}
    //           >
    //             Cancel
    //           </ModalButton>
    //         </div>
    //       </ModalContainer>
    //     </ModalOverlay>
    //   )}

    //   {editingTask && (
    //     <ModalOverlay>
    //       <ModalContainer>
    //         <h3>Edit Task</h3>
    //         {/* Task Title */}
    //         <Input
    //           type="text"
    //           value={editingTask.title}
    //           onChange={(e) =>
    //             setEditingTask({ ...editingTask, title: e.target.value })
    //           }
    //           placeholder="Enter task title"
    //         />
    //         {/* Task Description */}
    //         <textarea
    //           value={editingTask.description}
    //           onChange={(e) =>
    //             setEditingTask({ ...editingTask, description: e.target.value })
    //           }
    //           placeholder="Enter task description"
    //           style={{
    //             width: '100%',
    //             height: '100px',
    //             padding: '10px',
    //             margin: '10px 0',
    //             borderRadius: '5px',
    //             border: '1px solid #ccc',
    //             resize: 'vertical',
    //           }}
    //         />
    //         {/* Task Due Date */}
    //         <Input
    //           type="date"
    //           value={editingTask.dueDate}
    //           onChange={(e) =>
    //             setEditingTask({ ...editingTask, dueDate: e.target.value })
    //           }
    //         />
    //         {/* Action Buttons */}
    //         <div>
    //           <ModalButton onClick={saveEditedTask}>Save</ModalButton>
    //           <ModalButton onClick={() => setEditingTask(null)}>Cancel</ModalButton>
    //         </div>
    //       </ModalContainer>
    //     </ModalOverlay>
    //   )}

//     </div>
//   );
// };

// export default KanbanBoard;

import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Column from './Column';

// Styled Components

const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start; /* Prevents columns from stretching vertically */
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ColumnWrapper = styled.div`
  min-width: 200px; /* Minimum width for smaller columns */
  width: fit-content; /* Adjust width to fit the content */
  min-height: 100px; /* Minimum height to maintain structure */
  height: auto; /* Allow height to depend on content */
  background-color: #f4f5f7;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between tasks within the column */
//   align-items: flex-start; /* Align content within the column */
`;


const AddColumnButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ConfirmDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ColumnTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColumnActions = styled.div`
  display: flex;
  gap: 10px;
`;

const RenameButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;


const KanbanBoard = () => {
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

  const confirmRemoveColumn = () => {
    const newColumns = { ...columns };
    delete newColumns[columnToRemove];
    setColumns(newColumns);
    setShowConfirm(false);
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
  
  const saveEditedTask = () => {
    const { columnId, id, title, description, dueDate } = editingTask;
  
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      alert("All fields are required to save the task.");
      return;
    }
  
    setColumns((prevColumns) => {
      const updatedTasks = prevColumns[columnId].tasks.map((task) =>
        task.id === id
          ? { ...task, title, description, dueDate } // Update task details
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
                        <FaEdit />
                        </RenameButton>
                        <button onClick={() => { setColumns((prev) => { const newCols = { ...prev }; delete newCols[columnId]; return newCols; });  }}>
                        <FaTrash />
                        </button>
                    </ColumnActions>
                    </>
              )}
              </ColumnTitle>
              <Column
                 key={columnId}
                 columnId={columnId}
                 columns={columns}
                 setColumns={setColumns}
                 deleteTask={deleteTask}
                 toggleTaskCompletion={toggleTaskCompletion}
                 editTask={editTask}

              />
              <AddColumnButton onClick={() => setSelectedColumnId(columnId)} >Add Task</AddColumnButton>
            </ColumnWrapper>
          ))}
        </ColumnsContainer>
      </DndContext>

      <AddColumnButton onClick={() => setIsModalOpen(true)}>Add Column</AddColumnButton>

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
              }}
            />
            {/* Task Due Date */}
            <Input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />

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
