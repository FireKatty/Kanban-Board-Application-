import styled from 'styled-components';

// PageContainer for the main container with background and padding
export const PageContainer = styled.div`
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

// Header for the fixed header at the top
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
  padding: 10px 20px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    flex-wrap: wrap;
    padding: 8px 10px;
  }
`;

// Title for the page title in the header
export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin: 0;
  }
`;

// UserSection for the user-related actions and information
export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
  }
`;

// WelcomeMessage for the greeting or user message
export const WelcomeMessage = styled.span`
  font-size: 16px;
  margin-right: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// LogoutButton for logging out action button
export const LogoutButton = styled.button`
  margin-right: 30px;
  background-color: #ff4d4f;
  background-color: rgba(0,0,0, 10);
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

// BoardContainer for the layout of the Kanban board
export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 120px; /* Offset for fixed header */

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// FixedAddColumnButton for the add column button fixed on the screen
export const FixedAddColumnButton = styled.button`
  position: fixed;
  top: 70px; /* Adjust based on header height */
  right: 20px;
  background-color: #007bff;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
    top: 65px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
    top: 60px;
  }
`;
