import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Routes where Navbar should appear
  const showNavbarRoutes = ["/login", "/signup", "/"];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // If current route is not in showNavbarRoutes, don't render Navbar
  if (!showNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <header
      className={`motion-element ${isVisible ? "animate" : ""} fixed top-0 left-0 w-full z-50 
        flex justify-between items-center 
        px-6 py-4 bg-[#151d2a] shadow-md rounded-b-xl animate-delay-100`}
      style={{ animationName: "slideInLeft" }}
    >
      <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
        <div
          className={`motion-element ${isVisible ? "animate" : ""} relative group animate-delay-200`}
          style={{ animationName: "fadeInScale" }}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1
          className={`motion-element ${isVisible ? "animate" : ""} text-2xl font-bold text-white animate-delay-300`}
          style={{ animationName: "slideInLeft" }}
        >
          CloudCRM
        </h1>
      </Link>

      <Link
        to="/login"
        className={`motion-element ${isVisible ? "animate" : ""} bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-all duration-300 animate-delay-400 text-white`}
        style={{ animationName: "slideInRight" }}
      >
        Login
      </Link>
    </header>
  );
};

export default Navbar;
