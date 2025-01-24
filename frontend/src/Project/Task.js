// import React from "react";
// import styled from "styled-components";
// import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// const TaskWrapper = styled.div`
//   background-color: white;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 10px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 1);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
// `;

// const TaskDetails = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const TaskTitle = styled.h4`
//   margin: 0;
//   font-size: 16px;
// `;

// const TaskDescription = styled.p`
//   margin: 5px 0;
//   font-size: 14px;
//   color: #555;
// `;

// const TaskActions = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const TaskButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 5px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 14px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const SortableTask = ({ id, task, columnId, deleteTask, toggleTaskCompletion, editTask }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//       id,
//       data: { columnId },
//     });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//     };

//     return (
//       <TaskWrapper ref={setNodeRef} style={style}>
//         <div {...attributes} {...listeners} style={{ cursor: 'grab', marginRight: '10px' }}>
//           <FaEdit style={{ cursor: 'grab' }} />
//         </div>
//         <TaskDetails>
//           <TaskTitle>{task.title}</TaskTitle>
//           <TaskDescription>{task.description}</TaskDescription>
//           <small>Due: {task.dueDate}</small>
//         </TaskDetails>
//         <TaskActions>
//           <TaskButton
//             onClick={(e) => { e.stopPropagation(); toggleTaskCompletion(columnId, task.id); }}
//             aria-label={task.completed ? "Undo completion" : "Mark as complete"}
//           >
//             {task.completed ? <FaCheck /> : 'Complete'}
//           </TaskButton>
//           <TaskButton
//             onClick={(e) => { e.stopPropagation(); editTask(columnId, task.id); }}
//             aria-label="Edit task"
//           >
//             <FaEdit />
//           </TaskButton>
//           <TaskButton
//             onClick={(e) => { e.stopPropagation(); deleteTask(columnId, task.id); }}
//             aria-label="Delete task"
//           >
//             <FaTrash />
//           </TaskButton>
//         </TaskActions>
//       </TaskWrapper>
//     );
// };

// export default SortableTask;
import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(1, 1, 1, 1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  overflow-wrap: anywhere;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const TaskTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 8px 0;
  font-size: 14px;
  color: #666;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TaskButton = styled.button`
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

const AssignedUsers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
`;

const SortableTask = ({
    id,
    task,
    columnId,
    deleteTask,
    toggleTaskCompletion,
    editTask,
    columns,
    users,
    // assignUserToTask,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id,
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    // Safely handle `assignedUsers`
    console.log("start")
    
    // const arr = columns[columnId].tasks.map((user)=>user.assignedUsers.split(","))
    // console.log(arr)
    // arr.forEach(element => {
    //     element.map((userId) => users.find((user) => userId == user.id)).filter((user) => user !== undefined)
    // });
    const arr = columns[columnId].tasks.map((task) => task.assignedUsers.split(","));

    const assignedUsers = arr.map((element) =>
    element
        .map((userId) => users.find((user) => userId == user.id)) // Find user objects
        .filter((user) => user !== undefined) // Filter out undefined users
    );

    // console.log(allUsers);
    assignedUsers.map((userArray, index) => (
        
          userArray.map((user) => user)))
        
      
    
    console.log(assignedUsers)
    
    console.log(assignedUsers.map((user)=>user.map((userid)=>userid)))
  
    return (
      <TaskWrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TaskDetails>
          <TaskTitleWrapper>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskActions>
              <TaskButton onClick={(e) => toggleTaskCompletion(columnId, task.id)}>
                {task.completed ? <FaCheck /> : "Complete"}
              </TaskButton>
              <TaskButton onClick={(e) => editTask(columnId, task.id)}>
                <FaEdit />
              </TaskButton>
              <TaskButton onClick={(e) => deleteTask(columnId, task.id)}>
                <FaTrash />
              </TaskButton>
            </TaskActions>
          </TaskTitleWrapper>
          <TaskDescription>{task.description}</TaskDescription>
          <small>Due: {task.dueDate}</small>
          <AssignedUsers>
          {assignedUsers.map((userArray, index) => (
            <div key={index}>
                {userArray.map((user) => (
                <UserAvatar key={user.id} src={user.avatar} title={user.name} />
                ))}
            </div>
            ))}

             {/* <select
              onChange={(e) => {
                assignUserToTask(task.id, parseInt(e.target.value, 10));
              }}
              defaultValue=""
            > 
               <option value="" disabled>
                Assign User
              </option>
              {users
                .filter((user) => !(task.assignedUsers || []).includes(user.id))
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>  */}
          </AssignedUsers>
        </TaskDetails>
      </TaskWrapper>
    );
  };
  
  export default SortableTask;
  