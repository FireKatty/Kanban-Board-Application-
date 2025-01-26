import styled from 'styled-components';

// ColumnsContainer for the overall container of columns
export const ColumnsContainer = styled.div`
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

// ColumnWrapper for individual column styling
export const ColumnWrapper = styled.div`
  min-width: 200px; /* Minimum width for smaller columns */
  width: fit-content; /* Adjust width to fit the content */
  min-height: 100px; /* Minimum height to maintain structure */
  height: auto; /* Allow height to depend on content */
  background-color: #f4f5f7;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between tasks within the column */
  // align-items: flex-start; /* Align content within the column */
`;

// AddColumnButton for the button to add a task
export const AddColumnButton = styled.button`
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

// Input for input fields like text fields
export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.8);
  color:white;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

// ConfirmDialog for showing confirmation dialog box
export const ConfirmDialog = styled.div`
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

// ConfirmBox for the box within the confirmation dialog
export const ConfirmBox = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  // background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

// ConfirmButton for confirmation button within the dialog
export const ConfirmButton = styled.button`
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

// CancelButton for canceling actions
export const CancelButton = styled.button`
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
export const ModalOverlay = styled.div`
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

export const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  // background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin: 10px;  /* Added margin to create gap around the button */

  &:hover {
    background-color: #0056b3;
  }
`;

// ColumnTitle for styling column header
export const ColumnTitle = styled.h2`
  color: black;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// ColumnActions for managing column actions (rename, delete)
export const ColumnActions = styled.div`
  display: flex;
  gap: 10px;
`;

// RenameButton for renaming columns
export const RenameButton = styled.button`
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

// DateInputWithIcon for styling date inputs with icons
export const DateInputWithIcon = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  

  input[type="date"] {
    background-color: rgba(0, 0, 0, 0.8);
    color:white;
    padding: 5px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 98%;
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    color: white;
    pointer-events: none; /* Prevent icon from blocking the input */
  }
`;
