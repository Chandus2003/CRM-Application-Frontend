import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <- import useNavigate

export default function UserPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // <- initialize navigate

  useEffect(() => {
    if (!user) {
      navigate("/login"); // <- redirect if not logged in
      return;
    }
    fetchTickets();
  }, []);

//   const fetchTickets = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/tickets/my", {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       const data = await res.json();
//       if (res.ok) setTickets(data);
//     } catch (err) {
//       console.log("Error fetching tickets", err);
//     }
//   };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Ticket created successfully!");
        setTitle("");
        setDescription("");
        fetchTickets();
      } else {
        setMessage(data.message || "Error creating ticket");
      }
    } catch (err) {
      setMessage("Network error");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // <- redirect to login page
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name} 👋</h1>

      {/* Create Ticket Form */}
      <form
        onSubmit={handleCreateTicket}
        className="flex flex-col space-y-3 bg-slate-800 p-6 rounded w-full max-w-md"
      >
        <h2 className="text-xl font-semibold">Create Ticket</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 rounded bg-slate-700"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-slate-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          {loading ? "Creating..." : "Create Ticket"}
        </button>
        {message && <p>{message}</p>}
      </form>

      {/* My Tickets List */}
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">My Tickets</h2>
        {tickets.length === 0 ? (
          <p>No tickets created yet.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-slate-800 p-4 rounded space-y-1"
            >
              <h3 className="font-bold">{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p>Status: <span className="capitalize">{ticket.status}</span></p>
              <p>Assigned Engineer: {ticket.assignee_id.name}</p>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
      >
        Logout
      </button>
    </div>
  );
}
