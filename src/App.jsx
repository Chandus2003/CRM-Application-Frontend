import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";
import Signup from "./pages/Signup.jsx";

import "./App.css";

function App() {
  return (
    <>  
    <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
      </Routes>
    </>
  );
}

export default App;
