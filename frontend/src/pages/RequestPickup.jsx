import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RequestPickup = () => {
  const fileRef = useRef(null);
  const [address, setAddress] = useState("");
  const [filename, setFileName] = useState("");
  const [level, setLevel] = useState(1);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !address) {
      toast.warning("Please provide all details.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("address", address);
      formData.append("level", level);
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/waste/create",
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setAddress("");
        setLevel(1);
        setFile(null);
        setFileName("");

        if (fileRef.current) {
          fileRef.current.value = "";
        }
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to submit request.");
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
          Request a Waste Pickup
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

        {/* File Upload */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Upload Image
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Choose Image
            </button>
            <span className="text-sm text-gray-700 truncate">
              {filename || "No file selected"}
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            ref={fileRef}
            className="hidden"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestPickup;
