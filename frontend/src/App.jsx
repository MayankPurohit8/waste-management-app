import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router";
import Profile from "./pages/Profile";
import RequestPickup from "./pages/RequestPickup";

import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Admin from "./pages/admin";
function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  return (
    <>
      <BrowserRouter>
        <Navbar username={username} />
        <Routes>
          <Route path="/" element={<Home username={username} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={<Profile setUsername={setUsername} />}
          />
          <Route path="/request" element={<RequestPickup />} />

          <Route path="/login" element={<Login setUsername={setUsername} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
