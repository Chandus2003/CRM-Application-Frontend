import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";
import UserPage from "./pages/UserPage.jsx";
import Signup from "./pages/Signup.jsx";
import CreateEngineer from "./components/Enginner/createEngineer.jsx"

import "./App.css";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EngineerDashboard from "./pages/EngineerDashboard.jsx";

function App() {
  return (
    <>  
    <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-Engineer" element={<CreateEngineer />} />
        <Route path="/engineer" element={<EngineerDashboard />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
      </Routes>
    </>
  );
}

export default App;
