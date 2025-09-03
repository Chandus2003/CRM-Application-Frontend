import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEngineer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const engineerData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: "engineer",
      };

      // Replace with actual API call
      console.log("Creating engineer:", engineerData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
      setErrors({ submit: "Failed to create engineer. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="bg-slate-800 p-8 rounded-xl shadow-xl text-center">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            ✅
          </div>
          <h2 className="text-2xl font-bold mb-2">Engineer Created!</h2>
          <p className="text-slate-300">
            {formData.email} has been registered as an engineer.
          </p>
          <button
            onClick={() => navigate("/admin")}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">👷 Create Engineer</h1>
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Form Section */}
      <div className="flex justify-center py-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none ${
                errors.name ? "border border-red-500" : "border border-slate-600"
              }`}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none ${
                errors.email
                  ? "border border-red-500"
                  : "border border-slate-600"
              }`}
              placeholder="engineer@company.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Passwords */}
          <div>
            <label className="block mb-1 text-sm">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none ${
                errors.password
                  ? "border border-red-500"
                  : "border border-slate-600"
              }`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none ${
                errors.confirmPassword
                  ? "border border-red-500"
                  : "border border-slate-600"
              }`}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Errors */}
          {errors.submit && (
            <p className="text-red-400 text-sm">{errors.submit}</p>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Engineer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
