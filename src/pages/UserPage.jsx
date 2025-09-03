import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTicket from "../components/CreateTicket";
import ViewTickets from "../components/ViewTickets";

export default function UserPage() {
  const [activeComponent, setActiveComponent] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear logged-in user
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Sidebar / Options */}
      <div className="flex mb-6 gap-4">
        <button
          onClick={() => setActiveComponent("createTicket")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Create Ticket
        </button>

        <button
          onClick={() => setActiveComponent("viewTickets")}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          View Tickets
        </button>
      </div>

      {/* Conditional Rendering of Components */}
      <div className=" p-6 rounded ">
        {activeComponent === "createTicket" && <CreateTicket />}
        {activeComponent === "viewTickets" && <ViewTickets />}
        {!activeComponent && <div>Select an option above to continue.</div>}
      </div>
    </div>
  );
}
