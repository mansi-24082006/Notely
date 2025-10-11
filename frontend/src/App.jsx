import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root ("/") to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main routes */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback route for undefined paths */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
