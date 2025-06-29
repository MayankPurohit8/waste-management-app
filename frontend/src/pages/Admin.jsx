import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequest = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/requests",
          {
            withCredentials: true,
          }
        );
        setRequests(res.data.reports);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    getRequest();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    let newStatus = "";
    if (currentStatus === "pending") newStatus = "in progress";
    else if (currentStatus === "in progress") newStatus = "completed";
    else return;

    try {
      await axios.put(
        "http://localhost:5000/api/admin/updateStatus",
        { id, newStatus },
        { withCredentials: true }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
      console.log("deleted");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteRequest/${id}`,
        {
          withCredentials: true,
        }
      );

      setRequests(res.data.reports);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-xl border shadow p-4 flex flex-col justify-between"
          >
            <img
              src={`http://localhost:5000${req.img_url}`}
              alt="Waste"
              className="w-full h-40 object-cover rounded mb-4"
            />

            <div className="space-y-1 text-sm text-gray-700 mb-4">
              <p>
                <span className="font-medium">Address:</span> {req.address}
              </p>
              <p>
                <span className="font-medium">Level:</span> {req.level}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(req.created_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs text-white ${
                    req.status === "completed"
                      ? "bg-green-600"
                      : req.status === "in progress"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {req.status}
                </span>
              </p>
            </div>

            <div className="flex gap-2 mt-auto">
              {req.status !== "completed" && (
                <button
                  onClick={() => toggleStatus(req._id, req.status)}
                  className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Mark as{" "}
                  {req.status === "pending" ? "In Progress" : "Completed"}
                </button>
              )}
              <button
                onClick={() => deleteRequest(req._id)}
                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
