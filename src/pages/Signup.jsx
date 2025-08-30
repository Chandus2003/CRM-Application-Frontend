import React, { useState } from 'react';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault(); // prevent page reload

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        // alert("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

         navigate("/");
      } else {
        alert(`Registration failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-slate-700 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-slate-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-slate-700 text-white"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-slate-700 text-white"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
          >
            Sign-up
          </button>
        </form>
      </div>
    </div>
  );
}
