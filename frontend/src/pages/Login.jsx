import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsername }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pno: "",
  });

  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState(true);

  const handleLogin = async () => {
    const { email, password } = formData;
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setUsername(res.data.name);
      navigate("/profile");
    } catch (err) {
      console.log("Logging error : ", err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("server Respone : ", res.data);
      await handleLogin();
      setUsername(res.data.name);
      naviagate("/profile");
    } catch (err) {
      toast.err(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login ? "Login submitted:" : "Signup submitted:", formData);
    login ? handleLogin() : handleRegister();
  };

  return (
    <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-gray-700 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-gray-700 text-sm">Processing...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-sm m-5"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center">
          {login ? "Login to EcoWaste" : "Create an Account"}
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          {login ? "Welcome back!" : "Join us to manage your waste pickups"}
        </p>

        {!login && (
          <>
            <label className="block mb-2 text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your full name"
              required
              className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <label className="block mb-2 text-sm text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.pno}
              onChange={(e) =>
                setFormData({ ...formData, pno: e.target.value })
              }
              placeholder="Mobile number"
              required
              className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </>
        )}

        <label className="block mb-2 text-sm text-gray-600">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          required
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <label className="block mb-2 text-sm text-gray-600">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="••••••••"
          required
          className="w-full border border-gray-300 p-2 rounded mb-6 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          {login ? "Login" : "Signup"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          {login ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setLogin(!login)}
            className="text-gray-800 font-medium hover:underline"
          >
            {login ? "Signup" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
