import React, { useState, useEffect } from "react";

export default function ViewTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                alert("You must be logged in to view tickets.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/tickets/my", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    setTickets(result);
                } else {
                    alert(`Failed to fetch tickets: ${result.message || "Unknown error"}`);
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
                alert("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "open":
                return "bg-yellow-500 text-white";
            case "in progress":
                return "bg-blue-500 text-white";
            case "closed":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    <p className="mt-4 text-slate-300 text-lg">Loading tickets...</p>
                </div>
            </div>
        );
    }

    if (tickets.length === 0) {
        return (
            <div className="min-h-screen bg-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">No tickets found</h2>
                    <p className="text-slate-300">You haven't created any support tickets yet.</p>
                </div>
            </div>
        );
    }

    // Group tickets by status
    const groupedTickets = tickets.reduce((acc, ticket) => {
        const status = ticket.status || "Open";
        if (!acc[status]) acc[status] = [];
        acc[status].push(ticket);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-700">
            {/* Header */}
            <div className="bg-slate-400 shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-black">Support Tickets</h1>
                    <p className="text-gray-600 mt-2">View and manage your support requests</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-10">
                {Object.keys(groupedTickets).map((status) => (
                    <div key={status}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{status} Tickets</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {groupedTickets[status].map((ticket) => (
                                <div
                                    key={ticket._id}
                                    className="bg-slate-400 border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-lg text-gray-900 flex-1 pr-3">{ticket.title}</h3>
                                        <span
                                            className={`text-sm px-3 py-1 rounded-full font-medium border ${getStatusColor(ticket.status)}`}
                                        >
                                            {ticket.status || "Open"}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">{ticket.description}</p>
                                    <div className="text-xs text-gray-500 bg-slate-400 px-3 py-2 rounded">
                                        Ticket ID: {ticket._id}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}