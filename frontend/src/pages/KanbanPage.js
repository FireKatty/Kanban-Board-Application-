

// // // KanbanPage.js
// // import { useState } from 'react';
// // import React  from 'react';
// // import styled from 'styled-components';
// // import KanbanBoard from '../Project/KanbanBoard';
// // import { useNavigate } from 'react-router-dom';

// // const KanbanPage = () => {
// //   const [loggedIn, setLoggedIn] = useState(true); 
// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const navigate = useNavigate();
 

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/");

// //     // Additional logout logic can be added here (e.g., clearing tokens, redirecting)
// //   };

// //   return (
// //     <PageContainer>
// //       <Header>
// //         <Title>Kanban Board</Title>
// //         {loggedIn && (
// //           <UserSection>
// //             <WelcomeMessage>Welcome, {user.result.name} </WelcomeMessage>
// //             <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
// //           </UserSection>
// //         )}
// //       </Header>
// //       <BoardContainer>
// //         <KanbanBoard/>
// //       </BoardContainer>
// //     </PageContainer>
// //   );
// // };

// // export default KanbanPage;

// // // Styled Components

// // const PageContainer = styled.div`
// //   font-family: Arial, sans-serif;
// //   padding: 20px;
// // `;

// // const Header = styled.header`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   margin-bottom: 30px;
// //   position: relative;
// // `;

// // const Title = styled.h1`
// //   font-size: 32px;
// //   font-weight: bold;
// //   text-align: center;
// //   margin-right: 20px;
// // `;

// // const UserSection = styled.div`
// //   position: absolute;
// //   right: 20px;
// //   display: flex;
// //   align-items: center;
// // `;

// // const WelcomeMessage = styled.span`
// //   font-size: 16px;
// //   margin-right: 15px;
// // `;

// // const LogoutButton = styled.button`
// //   background-color: #ff4d4f;
// //   color: white;
// //   border: none;
// //   padding: 8px 15px;
// //   font-size: 14px;
// //   cursor: pointer;
// //   border-radius: 5px;
  
// //   &:hover {
// //     background-color: #ff7875;
// //   }
// // `;

// // const BoardContainer = styled.div`
// //   display: flex;
// //   justify-content: space-between;
// //   gap: 20px;
// //   /* Kanban board layout styles go here */
// // `;




// import { useState } from 'react';
// import React from 'react';
// import styled from 'styled-components';
// import KanbanBoard from '../Project/KanbanBoard';
// import { useNavigate } from 'react-router-dom';

// const KanbanPage = () => {
//   const [loggedIn, setLoggedIn] = useState(true); 
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <PageContainer>
//       <Header>
//         <Title>Kanban Board</Title>
//         {loggedIn && (
//           <UserSection>
//             <WelcomeMessage>Welcome, {user.result.name} </WelcomeMessage>
//             <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
//           </UserSection>
//         )}
//       </Header>
//       <BoardContainer>
//         <KanbanBoard />
//       </BoardContainer>
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
//   position: relative; /* Enable absolute positioning for children */
//   display: flex;
//   align-items: center;
//   margin-bottom: 30px;
// `;

// const Title = styled.h1`
//   position: absolute; /* Position the title absolutely */
//   left: 50%;
//   transform: translateX(-50%); /* Center the title horizontally */
//   font-size: 32px;
//   font-weight: bold;

//   @media (max-width: 768px) {
//     font-size: 28px;
//   }

//   @media (max-width: 480px) {
//     font-size: 24px;
//   }
// `;

// const UserSection = styled.div`
//   margin-left: auto; /* Push UserSection to the far right */
//   display: flex;
//   align-items: center;
//   gap: 10px; /* Add spacing between WelcomeMessage and LogoutButton */
// `;

// const WelcomeMessage = styled.span`
//   font-size: 16px;

//   @media (max-width: 768px) {
//     font-size: 14px;
//   }

//   @media (max-width: 480px) {
//     font-size: 12px;
//   }
// `;

// const LogoutButton = styled.button`
//   background-color: #ff4d4f;
//   color: white;
//   border: none;
//   padding: 8px 15px;
//   font-size: 14px;
//   cursor: pointer;
//   border-radius: 5px;

//   &:hover {
//     background-color: #ff7875;
//   }

//   @media (max-width: 768px) {
//     padding: 6px 12px;
//     font-size: 12px;
//   }

//   @media (max-width: 480px) {
//     padding: 5px 10px;
//     font-size: 10px;
//   }
// `;


// const BoardContainer = styled.div`
//   display: flex;
//   flex-direction: column; /* Stack the Kanban board vertically */
//   gap: 20px;

//   @media (min-width: 769px) {
//     flex-direction: row; /* Horizontal layout for larger screens */
//     justify-content: space-between;
//   }
// `;

import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import KanbanBoard from '../Project/KanbanBoard';
import { useNavigate } from 'react-router-dom';

const KanbanPage = () => {
  const [loggedIn, setLoggedIn] = useState(true); 
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <PageContainer>
      <Header>
        <Title>Kanban Board</Title>
        {loggedIn && (
          <UserSection>
            <WelcomeMessage>Welcome, {user.result.name}</WelcomeMessage>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserSection>
        )}
      </Header>
      <BoardContainer>
        <KanbanBoard />
      </BoardContainer>
    </PageContainer>
  );
};

export default KanbanPage;

// Styled Components

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  min-height: 94.5vh;
  background: url('bg.jpg') no-repeat center center fixed; /* Replace with your image path */
  background-size: cover;
  color: #fff; /* Ensures text is visible on darker backgrounds */

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const UserSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WelcomeMessage = styled.span`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
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

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 10px;
  }
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
