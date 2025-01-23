

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; // Import icons for rename, delete, and check
// import Column  from './Column';

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
//   padding: 10px;
//   border-radius: 8px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
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

// const ColumnActionButton = styled.button`
//   background-color: #f44336;
//   color: white;
//   border: none;
//   padding: 5px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #d32f2f;
//   }
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
//   const [columns, setColumns] = useState({
//     'todo': { name: 'To Do', tasks: [] },
//     'inProgress': { name: 'In Progress', tasks: [] },
//     'done': { name: 'Done', tasks: [] },
//   });

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [columnToRemove, setColumnToRemove] = useState(null);
//   const [newColumnName, setNewColumnName] = useState('');
//   const [isRenaming, setIsRenaming] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
//   const [taskToAdd, setTaskToAdd] = useState('');
//   const [selectedColumnId, setSelectedColumnId] = useState(null);
//   const [editingTask, setEditingTask] = useState(null); // For editing a task
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskDueDate, setTaskDueDate] = useState('');

//   const addColumn = (columnName) => {
//     const newColumnId = columnName.toLowerCase().replace(' ', '');
//     setColumns({
//       ...columns,
//       [newColumnId]: { name: columnName, tasks: [] },
//     });
    
//     setIsModalOpen(false); // Close modal after adding column
//     setNewColumnName('');
//   };

//   const renameColumn = (columnId) => {
//     const newColumns = { ...columns };
//     newColumns[columnId].name = newColumnName;
//     setColumns(newColumns);
//     setIsRenaming(null);
//     setNewColumnName('');
//   };

//   const handleRemoveColumn = (columnId) => {
//     setShowConfirm(true);
//     setColumnToRemove(columnId);
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

//   return (
//     <div>
//       <ColumnsContainer>
//         {Object.keys(columns).map((columnId) => (
//           <ColumnWrapper key={columnId}>
//             <ColumnTitle>
//               {isRenaming === columnId ? (
//                 <div>
//                   <Input
//                     type="text"
//                     value={newColumnName}
//                     onChange={(e) => setNewColumnName(e.target.value)}
//                     placeholder="Enter new name"
//                   />
//                   <RenameButton onClick={() => renameColumn(columnId)}>
//                     Save
//                   </RenameButton>
//                 </div>
//               ) : (
//                 <>
//                   {columns[columnId].name}
//                   <ColumnActions>
//                     <RenameButton onClick={() => { setIsRenaming(columnId); setNewColumnName(columns[columnId].name); }}>
//                       <FaEdit />
//                     </RenameButton>
//                     <ColumnActionButton onClick={() => handleRemoveColumn(columnId)}>
//                       <FaTrash />
//                     </ColumnActionButton>
//                   </ColumnActions>
//                 </>
//               )}
//             </ColumnTitle>
//             <Column columnId={columnId} column={columns[columnId]} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} editTask={editTask} />
//             <AddColumnButton onClick={() => setSelectedColumnId(columnId)}>Add Task</AddColumnButton>
//           </ColumnWrapper>
//         ))}
//       </ColumnsContainer>

//       <AddColumnButton onClick={() => setIsModalOpen(true)}>Add Column</AddColumnButton>

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


//       {selectedColumnId && (
//         <ModalOverlay>
//           <ModalContainer>
//             <h3>Add New Task</h3>
//             {/* Task Title */}
//             <Input
//               type="text"
//               value={taskToAdd}
//               onChange={(e) => setTaskToAdd(e.target.value)}
//               placeholder="Enter task title"
//             />
//             {/* Task Description */}
//             <textarea
//               value={taskDescription}
//               onChange={(e) => setTaskDescription(e.target.value)}
//               placeholder="Enter task description"
//               style={{
//                 width: '100%',
//                 height: '100px',
//                 padding: '10px',
//                 margin: '10px 0',
//                 borderRadius: '5px',
//                 border: '1px solid #ccc',
//                 resize: 'vertical',
//               }}
//             />
//             {/* Task Due Date */}
//             <Input
//               type="date"
//               value={taskDueDate}
//               onChange={(e) => setTaskDueDate(e.target.value)}
//             />
//             {/* Action Buttons */}
//             <div>
//               <ModalButton
//                 onClick={() => {
//                   addTask(selectedColumnId, {
//                     title: taskToAdd,
//                     description: taskDescription,
//                     dueDate: taskDueDate,
//                   });
//                   setTaskToAdd(''); // Reset fields
//                   setTaskDescription('');
//                   setTaskDueDate('');
//                   setSelectedColumnId(null); // Close modal
//                 }}
//               >
//                 Add Task
//               </ModalButton>
//               <ModalButton
//                 onClick={() => {
//                   setTaskToAdd('');
//                   setTaskDescription('');
//                   setTaskDueDate('');
//                   setSelectedColumnId(null);
//                 }}
//               >
//                 Cancel
//               </ModalButton>
//             </div>
//           </ModalContainer>
//         </ModalOverlay>
//       )}

//       {editingTask && (
//         <ModalOverlay>
//           <ModalContainer>
//             <h3>Edit Task</h3>
//             {/* Task Title */}
//             <Input
//               type="text"
//               value={editingTask.title}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, title: e.target.value })
//               }
//               placeholder="Enter task title"
//             />
//             {/* Task Description */}
//             <textarea
//               value={editingTask.description}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, description: e.target.value })
//               }
//               placeholder="Enter task description"
//               style={{
//                 width: '100%',
//                 height: '100px',
//                 padding: '10px',
//                 margin: '10px 0',
//                 borderRadius: '5px',
//                 border: '1px solid #ccc',
//                 resize: 'vertical',
//               }}
//             />
//             {/* Task Due Date */}
//             <Input
//               type="date"
//               value={editingTask.dueDate}
//               onChange={(e) =>
//                 setEditingTask({ ...editingTask, dueDate: e.target.value })
//               }
//             />
//             {/* Action Buttons */}
//             <div>
//               <ModalButton onClick={saveEditedTask}>Save</ModalButton>
//               <ModalButton onClick={() => setEditingTask(null)}>Cancel</ModalButton>
//             </div>
//           </ModalContainer>
//         </ModalOverlay>
//       )}

//     </div>
//   );
// };

// export default Columns;



import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; // Import icons for rename, delete, and check
import Column  from './Column';

// Styled Components
const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ColumnWrapper = styled.div`
  width: 300px;
  background-color: #f4f5f7;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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

const ColumnActionButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
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

const Columns = () => {
  const [columns, setColumns] = useState({
    'todo': { name: 'To Do', tasks: [] },
    'inProgress': { name: 'In Progress', tasks: [] },
    'done': { name: 'Done', tasks: [] },
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [columnToRemove, setColumnToRemove] = useState(null);
  const [newColumnName, setNewColumnName] = useState('');
  const [isRenaming, setIsRenaming] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [taskToAdd, setTaskToAdd] = useState('');
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [editingTask, setEditingTask] = useState(null); // For editing a task
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  const addColumn = (columnName) => {
    const newColumnId = columnName.toLowerCase().replace(' ', '');
    setColumns({
      ...columns,
      [newColumnId]: { name: columnName, tasks: [] },
    });
    
    setIsModalOpen(false); // Close modal after adding column
    setNewColumnName('');
  };

  const renameColumn = (columnId) => {
    const newColumns = { ...columns };
    newColumns[columnId].name = newColumnName;
    setColumns(newColumns);
    setIsRenaming(null);
    setNewColumnName('');
  };

  const handleRemoveColumn = (columnId) => {
    setShowConfirm(true);
    setColumnToRemove(columnId);
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
    const newTask = {
      id: Date.now(),
      title: taskDetails.title,
      description: taskDetails.description,
      dueDate: taskDetails.dueDate,
      completed: false,
    };
    const updatedColumns = { ...columns };
    updatedColumns[columnId].tasks.push(newTask);
    setColumns(updatedColumns);
    setTaskToAdd(''); // Clear the input field
    setSelectedColumnId(null); // Close the modal
  };

  const deleteTask = (columnId, taskId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].tasks = updatedColumns[columnId].tasks.filter(
      (task) => task.id !== taskId
    );
    setColumns(updatedColumns);
  };

  const toggleTaskCompletion = (columnId, taskId) => {
    const updatedColumns = { ...columns };
    const task = updatedColumns[columnId].tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setColumns(updatedColumns);
    }
  };

  const editTask = (columnId, taskId) => {
    const task = columns[columnId].tasks.find((t) => t.id === taskId);
    setEditingTask({ ...task, columnId });
  };

  const saveEditedTask = () => {
    const { columnId, id, title, description, dueDate } = editingTask;
    const updatedColumns = { ...columns };
    const taskIndex = updatedColumns[columnId].tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      updatedColumns[columnId].tasks[taskIndex] = { ...updatedColumns[columnId].tasks[taskIndex], title, description, dueDate };
    }
    setColumns(updatedColumns);
    setEditingTask(null); // Close the edit modal
  };

  return (
    <div>
      <ColumnsContainer>
        {Object.keys(columns).map((columnId) => (
          <ColumnWrapper key={columnId}>
            <ColumnTitle>
              {isRenaming === columnId ? (
                <div>
                  <Input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Enter new name"
                  />
                  <RenameButton onClick={() => renameColumn(columnId)}>
                    Save
                  </RenameButton>
                </div>
              ) : (
                <>
                  {columns[columnId].name}
                  <ColumnActions>
                    <RenameButton onClick={() => { setIsRenaming(columnId); setNewColumnName(columns[columnId].name); }}>
                      <FaEdit />
                    </RenameButton>
                    <ColumnActionButton onClick={() => handleRemoveColumn(columnId)}>
                      <FaTrash />
                    </ColumnActionButton>
                  </ColumnActions>
                </>
              )}
            </ColumnTitle>
            <Column columnId={columnId} column={columns[columnId]} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} editTask={editTask} />
            <AddColumnButton onClick={() => setSelectedColumnId(columnId)}>Add Task</AddColumnButton>
          </ColumnWrapper>
        ))}
      </ColumnsContainer>

      <AddColumnButton onClick={() => setIsModalOpen(true)}>Add Column</AddColumnButton>

      {showConfirm && (
        <ConfirmDialog>
          <ConfirmBox>
            <p>Are you sure you want to remove this column?</p>
            <ConfirmButton onClick={confirmRemoveColumn}>Yes</ConfirmButton>
            <CancelButton onClick={cancelRemoveColumn}>No</CancelButton>
          </ConfirmBox>
        </ConfirmDialog>
      )}

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <h3>Add New Column</h3>
            <Input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Enter column name"
            />
            <div>
              <ModalButton onClick={() => addColumn(newColumnName)}>Add Column</ModalButton>
              <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
            </div>
          </ModalContainer>
        </ModalOverlay>
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
            {/* Action Buttons */}
            <div>
              <ModalButton
                onClick={() => {
                  addTask(selectedColumnId, {
                    title: taskToAdd,
                    description: taskDescription,
                    dueDate: taskDueDate,
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

export default Columns;
