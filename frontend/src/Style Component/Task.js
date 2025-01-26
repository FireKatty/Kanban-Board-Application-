import styled from 'styled-components';

export const TaskWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(1, 1, 1, 1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  overflow-wrap: break-word; /* Added for better text handling */
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;

export const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const TaskTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TaskTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #d5b9b9; /* A bit lighter for better contrast */
`;

export const TaskDescription = styled.p`
  color: rgb(118, 152, 152);
  margin: 8px 0;
  font-size: 14px;
  word-wrap: break-word; /* Ensure long words break properly */
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const TaskButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// export const AssignedUsers = styled.div`
//   align-items: center;
//   gap: 10px;
//   margin-top: 10px;
// `;

// export const UserAvatar = styled.img`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   border: 2px solid #ddd;
//   object-fit: cover;
//   margin-right: 5px;
// `;

export const AssignedUsers = styled.div`
  // display: flex;
  align-items: center;
  gap: 5px; /* Reduced gap */
  margin-top: 10px;
`;

export const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
  margin-right: 5px; /* Adjust margin between avatars */
`;

