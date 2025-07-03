import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const UpdateRequest = ({ id }) => {
  const [address, setAddress] = useState("");
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      toast.warning("Please provide all details.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/waste/update",
        { address, level, id },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setAddress("");
        setLevel(1);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to update request.");
    }
  };

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
            type="submit"
            className="w-full text-gray-800 border rounded-lg hover:bg-gray-100 transition"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequest;
