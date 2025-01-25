
// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, allowedRole }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user)
//   console.log({po:"PV",user})
//   // Check if the user is logged in and has the required role
//   if (user && user.result) {
//     return children;
//   } else {
//     alert("Unauthorized access. Redirecting to login.");
//     return <Navigate to="/" />;
//   }
// };
// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Check if user is logged in, and redirect to login if not
  if (!user || !user.auth) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;
