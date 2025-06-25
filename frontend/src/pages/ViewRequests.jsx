const ViewRequests = () => {
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
        {dummyRequests.map((req) => (
          <div key={req.id} className="bg-white p-4 rounded shadow-sm border">
            <p>
              <strong>Type:</strong> {req.type}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
            <p>
              <strong>Address:</strong> {req.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRequests;
