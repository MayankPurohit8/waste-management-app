import { useState } from "react";

const RequestPickup = () => {
  const [formData, setFormData] = useState({
    address: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // send formData to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Request a Pickup
        </h2>

        <label className="block mb-2 text-sm text-gray-600">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Enter your address"
          required
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <label className="block mb-2 text-sm text-gray-600">Waste Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
          className="w-full border border-gray-300 p-2 rounded mb-6 focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="">Select Type</option>
          <option value="organic">Organic</option>
          <option value="plastic">Plastic</option>
          <option value="e-waste">E-Waste</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestPickup;
