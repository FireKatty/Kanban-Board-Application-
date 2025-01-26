
import { useState } from 'react';
import React from 'react';
import KanbanBoard from '../Project/KanbanBoard';
import { useNavigate } from 'react-router-dom';
import { useKanban } from '../context/KanbanContext';
import {
  PageContainer,
  Header,
  Title,
  UserSection,
  WelcomeMessage,
  LogoutButton,
  BoardContainer,
  FixedAddColumnButton
} from '../Style Component/KanbanPage.js';


const KanbanPage = () => {
  const [loggedIn] = useState(true); 
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const {setIsModalOpen} = useKanban();

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
      <FixedAddColumnButton onClick={() => setIsModalOpen(true)}>Add Column</FixedAddColumnButton>
      <BoardContainer>
        <KanbanBoard />
      </BoardContainer>
    </PageContainer>
  );
};

export default KanbanPage;

