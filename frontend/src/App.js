
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./components/ProtectedRoute";
import { KanbanProvider } from './context/KanbanContext';
import Login from './components/Login';
import KanbanBoard from './pages/KanbanPage';

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Redirect to board if user is logged in, else show Login */}
        <Route path="/" element={user ? <Navigate to="/board" replace /> : <Login />} />

        {/* Protected Route for Kanban Board */}
        <Route
          path="/board"
          element={
            <PrivateRoute>
              <KanbanProvider>
                <KanbanBoard />
              </KanbanProvider>
            </PrivateRoute>
          }
        />

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
