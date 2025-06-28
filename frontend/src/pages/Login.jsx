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
        { email, password },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setUsername(res.data.name);
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
        { withCredentials: true }
      );
      await handleLogin();
      setUsername(res.data.name);
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login ? handleLogin() : handleRegister();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {loading && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-dashed border-gray-600 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-700 text-sm">Processing...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-5"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {login ? "Login to EcoWaste" : "Create Your Account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {login
              ? "Welcome back! Please login to continue."
              : "Join us and start making an impact."}
          </p>
        </div>

        {!login && (
          <>
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.pno}
                onChange={(e) =>
                  setFormData({ ...formData, pno: e.target.value })
                }
                placeholder="e.g. 9876543210"
                required
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
              />
            </div>
          </>
        )}

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="you@example.com"
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="••••••••"
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          {login ? "Login" : "Signup"}
        </button>

        {/* Toggle Link */}
        <p className="text-sm text-center text-gray-600 mt-3">
          {login ? "New to EcoWaste?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setLogin(!login)}
            className="text-gray-800 font-semibold hover:underline ml-1"
          >
            {login ? "Create account" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
