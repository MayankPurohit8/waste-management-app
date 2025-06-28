import axios from "axios";
import { useEffect, useState } from "react";
const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/requests", {
          withCredentials: true,
        });
        setRequests(res.data);
      } catch (err) {}
    };
    getRequests();
  }, []);
  const dummyRequests = [
    { id: 1, type: "Organic", status: "Scheduled", address: "22, Ashok Nagar" },
    {
      id: 2,
      type: "Plastic",
      status: "Completed",
      address: "Sector 12, Noida",
    },
  ];

  return (
    <div className="min-h-[70vh] bg-gray-50 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Your Pickup Requests
      </h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req._id} className="bg-white p-4 rounded shadow-sm border">
            <p>
              <strong>Address:</strong> {req.address}
            </p>
            <p>
              <strong>Date:</strong> {req.created_at}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRequests;
