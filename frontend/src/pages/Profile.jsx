import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

const Profile = ({ setUsername }) => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [id, setId] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all or completed
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            withCredentials: true,
          }
        );

        const requestRes = await axios.get(
          "http://localhost:5000/api/user/requests",
          {
            withCredentials: true,
          }
        );

        setUser(profileRes.data);
        setRequests(requestRes.data);
        localStorage.setItem("username", profileRes.data.name);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        } else {
          toast.error("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("username");
      setUsername("");
      navigate("/login");
      toast.success("Logged out successfully.");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  const [address, setAddress] = useState("");
  const [level, setLevel] = useState(1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      toast.warning("Please provide all details.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:5000/api/waste/update",
        { address, level, id },
        { withCredentials: true }
      );
      setRequests(res.data.reports);
      setUpdating(false);
      setLoading(false);
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to update request.", err.message);
      setUpdating(false);
    }
  };

  const filteredRequests =
    activeTab === "completed"
      ? requests.filter((req) => req.status === "completed")
      : requests.filter((req) => req.status != "completed");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }
  if (updating) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Update Request Details
          </h2>

          {/* Address Input */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Pickup Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
            />
          </div>

          {/* Waste Level */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Waste Severity Level
            </label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium ${
                    level === lvl
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Level {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-5">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Update
            </button>
            <button
              type="button"
              className="w-full text-gray-800 border rounded-lg hover:bg-gray-100 transition"
              onClick={() => setUpdating(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Profile
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Requests */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Pickup Requests
            </h2>
            <div className="space-x-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "all"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "completed"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="bg-white  rounded-lg p-6 text-center text-gray-500">
              No {activeTab} pickup requests found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredRequests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col"
                >
                  <img
                    src={`http://localhost:5000${req.img_url}`}
                    alt="Waste"
                    className={
                      req.status == "completed"
                        ? "w-full h-40 object-cover rounded mb-3 border filter grayscale"
                        : "w-full h-40 object-cover rounded mb-3 border "
                    }
                  />

                  <div className=" text-sm space-y-1 text-gray-700 flex justify-between">
                    <div>
                      <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {req.address}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(req.created_at).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${
                            req.status === "pending"
                              ? "bg-yellow-500"
                              : req.status === "completed"
                              ? "bg-green-600"
                              : "bg-gray-500"
                          }`}
                        >
                          {req.status}
                        </span>
                      </p>
                    </div>

                    {req.status != "pending" ? null : (
                      <button
                        className="hover:text-black text-gray-400 flex flex-col justify-center items-center gap-2.5 relative hover:[&>div]:block transition cursor-pointer "
                        onClick={() => {
                          setId(req._id);
                          setUpdating(true);
                        }}
                      >
                        <Edit />
                        <div className="border px-2 rounded-xl absolute top-12 hidden">
                          edit
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
