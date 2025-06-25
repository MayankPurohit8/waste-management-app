import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router";
import Profile from "./pages/Profile";
import RequestPickup from "./pages/RequestPickup";
import ViewRequests from "./pages/ViewRequests";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  return (
    <>
      <BrowserRouter>
        <Navbar username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={<Profile setUsername={setUsername} />}
          />
          <Route path="/request" element={<RequestPickup />} />
          <Route path="/track" element={<ViewRequests />} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
