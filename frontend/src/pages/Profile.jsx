import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = ({ setUsername }) => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // all or completed
  const [loading, setLoading] = useState(true);
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
        console.log(requestRes.data);
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

  const filteredRequests =
    activeTab === "completed"
      ? requests.filter((req) => req.status === "completed")
      : requests;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
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
            <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
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
                    className="w-full h-40 object-cover rounded mb-3 border"
                    onError={(e) => (e.target.src = "/default-image.jpg")}
                  />

                  <div className="flex-1 text-sm space-y-1 text-gray-700">
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
