import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ username }) => {
  return (
    <nav className="w-full px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">EcoWaste</h1>
      <div className="space-x-6 text-gray-600 text-sm items-center">
        <Link to="/">Home</Link>
        <Link to="/request">Request Pickup</Link>
        <Link to="/track">Track</Link>
        {username ? (
          <Link
            to="/profile"
            className="px-3 py-2 bg-gray-300 rounded-full text-lg font-bold"
          >
            {username[0].toUpperCase()}
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
