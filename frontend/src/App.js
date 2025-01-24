import React, { useState } from 'react';
// import Board from './components/Board';
import KanbanPage from './Project/KanbanBoard';

function App() {
  return (
    <div className="App">
      <KanbanPage/>
      {/* <h1>Kanban Board</h1>
      <Board columns={columns} addTask={addTask} /> */}
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import Columns from './components/Columns';

// const initialColumns = {
//   todo: {
//     title: 'To Do',
//     tasks: [
//       { id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2025-01-24', completed: false },
//       { id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2025-01-25', completed: false },
//     ],
//   },
//   inProgress: {
//     title: 'In Progress',
//     tasks: [
//       { id: '3', title: 'Task 3', description: 'Description 3', dueDate: '2025-01-26', completed: false },
//     ],
//   },
//   done: {
//     title: 'Done',
//     tasks: [],
//   },
// };

// const App = () => {
//   const [columns, setColumns] = useState(initialColumns);

//   const deleteTask = (columnId, taskId) => {
//     setColumns((prev) => ({
//       ...prev,
//       [columnId]: {
//         ...prev[columnId],
//         tasks: prev[columnId].tasks.filter((task) => task.id !== taskId),
//       },
//     }));
//   };

//   const toggleTaskCompletion = (columnId, taskId) => {
//     setColumns((prev) => ({
//       ...prev,
//       [columnId]: {
//         ...prev[columnId],
//         tasks: prev[columnId].tasks.map((task) =>
//           task.id === taskId ? { ...task, completed: !task.completed } : task
//         ),
//       },
//     }));
//   };

//   const editTask = (columnId, taskId) => {
//     // Implement edit task logic here
//   };

//   return (
//     <div>
//       <h1>Kanban Board</h1>
//       <Columns columnsData={columns} setColumns={setColumns} />
//     </div>
//   );
// };

// export default App;
