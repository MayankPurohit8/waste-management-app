import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = ({ username }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Auto-hide on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Scroll down = hide navbar
      } else {
        setShowNavbar(true); // Scroll up = show navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white shadow-md border-b sticky top-0 z-50 transform transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center  text-xl font-bold text-green-700">
          <img src={logo} alt="SafaiSetu Logo" className="h-20 w-auto" />
          <span className="text-gray-800">SafaiSetu</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-green-700 transition">
            Home
          </Link>
          {username ? (
            <>
              <Link to="/request" className="hover:text-green-700 transition">
                Request Pickup
              </Link>
              <Link
                to="/profile"
                className="w-9 h-9 bg-green-600 text-white flex items-center justify-center rounded-full text-base font-semibold"
                title="Profile"
              >
                {username[0].toUpperCase()}
              </Link>
            </>
          ) : (
            <Link to="/login" className="hover:text-green-700 transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-green-700"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm text-gray-700">
          <Link to="/" className="block hover:text-green-700 transition">
            Home
          </Link>
          <Link to="/request" className="block hover:text-green-700 transition">
            Request Pickup
          </Link>
          {username ? (
            <Link
              to="/profile"
              className="inline-block px-3 py-2 bg-green-600 text-white rounded-full font-semibold"
            >
              {username[0].toUpperCase()}
            </Link>
          ) : (
            <Link to="/login" className="block hover:text-green-700 transition">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
