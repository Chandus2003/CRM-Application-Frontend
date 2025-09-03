import React, { useState } from "react";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
    if (!user || !user.token) {
      alert("You must be logged in to create a ticket.");
      setLoading(false);
      return;
    }

    const ticketData = {
      title,
      description,
      userId: user._id,
    };

    try {
      const response = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(ticketData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Ticket created successfully!");
        setTitle("");
        setDescription("");
      } else {
        alert(`Failed to create ticket: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 rounded bg-slate-700  max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Create Ticket</h2>
      <form onSubmit={handleCreateTicket} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-slate-600 text-white"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-slate-600 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-semibold bg-green-600 hover:bg-green-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}
