import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Profile = ({ setUsername }) => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true,
        });

        const res2 = await axios.get(
          "http://localhost:5000/api/user/requests",
          {
            withCredentials: true,
          }
        );

        setUser(res.data);
        setRequests(res2.data);

        localStorage.setItem("username", res.data.name);
      } catch (err) {
        if (err.response.status === 401) {
          toast.error("Session Expired");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      localStorage.removeItem("username");
      setUsername("");
      navigate("/login");
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h2>

      <div className="bg-white shadow rounded p-4 mb-8">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Phone:</strong> {user?.phone}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Pickup Requests
      </h3>
      {requests.length === 0 ? (
        <p className="text-gray-600">No pickup requests made yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req, idx) => (
            <li
              key={req._id || idx}
              className="bg-gray-50 p-4 rounded border border-gray-200"
            >
              <p>
                <strong>Address:</strong> {req.address}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(req.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {req.status}
              </p>
            </li>
          ))}
        </ul>
      )}
      <input
        type="button"
        value="Logout"
        className="bg-red-400 px-3 py-2 rounded-2xl mt-4 text-white text-xl"
        onClick={() => handleLogout()}
      />
    </div>
  );
};

export default Profile;
