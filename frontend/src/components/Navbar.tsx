import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User, LogOut, BarChart3, BookDashed } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Renders the Navbar component, providing navigation links for the application.
 * 
 * - If the user is authenticated, displays links to "Exams", "Contact", and conditional
 *   links for creating and managing exams based on user roles (admin/examiner).
 * - Displays a logout button with user's name and role.
 * 
 * - If the user is not authenticated, displays "Login" and "Register" links.
 * 
 * - The component is responsive, showing a toggleable mobile menu in smaller viewports.
 * 
 * Uses:
 * - `useAuth` for authentication state and logout functionality.
 * - `useNavigate` for programmatic navigation.
 * - `useState` for managing the mobile menu open state.
 */

/******  a2094d67-a801-4d77-b949-3405c7d82b28  *******/
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-[#121212] to-[#1f1f1f] shadow-lg sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <BookDashed className="h-9 w-9 text-blue-500 animate-pulse" />
            <span className="text-2xl font-bold text-white tracking-wide">
              PrepNinja
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {isAuthenticated ? (
              <>
                {/* <Link
                  to="/exams"
                  className="text-white hover:text-blue-400 transition duration-300"
                >
                  Exams
                </Link> */}
                <Link
                  to="/contact"
                  className="text-white hover:text-blue-400 transition duration-300"
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:text-blue-400 transition duration-300"
                >
                  About
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center text-white hover:text-blue-400 transition duration-300"
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  <LogOut className="inline-block w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-400 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 px-4 py-2 rounded-lg text-white shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] text-white">
          <div className="px-4 py-4 space-y-4">
            <Link to="/exams" onClick={toggleMenu}>
              Exams
            </Link>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
            {isAuthenticated && (
              <>
                {user?.role === "admin" && (
                  <Link to="/admin/dashboard" onClick={toggleMenu}>
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 w-full text-left px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
