// // src/pages/KanbanPage.js
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import KanbanBoard from '../components/Board';

// const mockUsers = ['John', 'Jane', 'Mike'];



// const KanbanPage = () => {
//     const initialColumns = {
//         'todo': {
//           name: 'To Do',
//           tasks: [
//             { id: 'task-1', content: 'Task 1', assignee: 'John' },
//             { id: 'task-2', content: 'Task 2', assignee: 'Jane' }
//           ]
//         },
//         'inProgress': {
//           name: 'In Progress',
//           tasks: [
//             { id: 'task-3', content: 'Task 3', assignee: 'Mike' }
//           ]
//         },
//         'done': {
//           name: 'Done',
//           tasks: []
//         }
//     };
//     const [columns, setColumns] = useState({
//         'todo': {
//           name: 'To Do',
//           tasks: [
//             { id: 'task-1', content: 'Task 1', assignee: 'John' },
//             { id: 'task-2', content: 'Task 2', assignee: 'Jane' }
//           ]
//         }});

// //   const handleDragEnd = (result) => {
// //     const { destination, source } = result;
// //     if (!destination) return;

// //     if (destination.droppableId === source.droppableId) {
// //       const column = columns[source.droppableId];
// //       const updatedTasks = Array.from(column.tasks);
// //       const [removed] = updatedTasks.splice(source.index, 1);
// //       updatedTasks.splice(destination.index, 0, removed);

// //       const updatedColumns = { ...columns, [source.droppableId]: { ...column, tasks: updatedTasks } };
// //       setColumns(updatedColumns);
// //     } else {
// //       const sourceColumn = columns[source.droppableId];
// //       const destColumn = columns[destination.droppableId];
// //       const sourceTasks = Array.from(sourceColumn.tasks);
// //       const destTasks = Array.from(destColumn.tasks);

// //       const [removed] = sourceTasks.splice(source.index, 1);
// //       destTasks.splice(destination.index, 0, removed);

// //       const updatedColumns = {
// //         ...columns,
// //         [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
// //         [destination.droppableId]: { ...destColumn, tasks: destTasks }
// //       };
// //       setColumns(updatedColumns);
// //     }
// //   };

//   const addColumn = () => {
//     const columnId = `column-${Date.now()}`;
//     const newColumn = { name: `New Column`, tasks: [] };
//     setColumns({ ...columns, [columnId]: newColumn });
//   };

//   const renameColumn = (id, newName) => {
//     const updatedColumns = { ...columns, [id]: { ...columns[id], name: newName } };
//     setColumns(updatedColumns);
//   };

//   const removeColumn = (id) => {
//     const updatedColumns = { ...columns };
//     delete updatedColumns[id];
//     setColumns(updatedColumns);
//   };

//   const addTask = (columnId, taskContent, assignee) => {
//     const taskId = `task-${Date.now()}`;
//     const newTask = { id: taskId, content: taskContent, assignee };
//     const updatedColumn = { ...columns[columnId], tasks: [...columns[columnId].tasks, newTask] };
//     setColumns({ ...columns, [columnId]: updatedColumn });
//   };

//   const removeTask = (columnId, taskId) => {
//     const updatedTasks = columns[columnId].tasks.filter(task => task.id !== taskId);
//     const updatedColumn = { ...columns[columnId], tasks: updatedTasks };
//     setColumns({ ...columns, [columnId]: updatedColumn });
//   };

//   return (
//     <PageContainer>
//       <Header>
//         <Title>Kanban Board</Title>
//         <AddColumnButton onClick={addColumn}>Add Column</AddColumnButton>
//       </Header>

//       <KanbanBoard
//         columns={columns}
//         // handleDragEnd={handleDragEnd}
//         renameColumn={renameColumn}
//         removeColumn={removeColumn}
//         addTask={addTask}
//         removeTask={removeTask}
//       />
//     </PageContainer>
//   );
// };

// export default KanbanPage;

// // Styled Components

// const PageContainer = styled.div`
//   font-family: Arial, sans-serif;
//   padding: 20px;
// `;

// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 30px;
// `;

// const Title = styled.h1`
//   font-size: 32px;
// `;

// const AddColumnButton = styled.button`
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
// `;


// KanbanPage.js
import { useState } from 'react';
import React  from 'react';
import Columns from '../components/Columns'; // Import the Columns component

import styled from 'styled-components';
import KanbanBoard from '../Project/KanbanBoard';

const KanbanPage = ({ user }) => {
  const [loggedIn, setLoggedIn] = useState(true); 

  const handleLogout = () => {
    setLoggedIn(false);
    // Additional logout logic can be added here (e.g., clearing tokens, redirecting)
  };

  return (
    <PageContainer>
      <Header>
        <Title>Kanban Board</Title>
        {loggedIn && (
          <UserSection>
            <WelcomeMessage>Welcome, {user}</WelcomeMessage>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserSection>
        )}
      </Header>
      <BoardContainer>
        <KanbanBoard/>
      </BoardContainer>
    </PageContainer>
  );
};

export default KanbanPage;

// Styled Components

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-right: 20px;
`;

const UserSection = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
`;

const WelcomeMessage = styled.span`
  font-size: 16px;
  margin-right: 15px;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    background-color: #ff7875;
  }
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  /* Kanban board layout styles go here */
`;



