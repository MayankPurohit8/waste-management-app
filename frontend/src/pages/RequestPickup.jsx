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
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };
  const handleSubmit = (e) => {
    try {
      const formData = new FormData();
      formData.append("address", address);
      formData.append("level", level);
      formData.append("file", file);
      e.preventDefault();
      let res = axios.post("http://localhost:5000/api/waste/create", formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.Slide("success");
      }
      setFile(null);
      setFileName("");
      fileRef.current.value = null;
      toast.success("Request reported");
    } catch (err) {
      toast.error("Report not submitted");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Request a Pickup
        </h2>

        <label className="block mb-2 text-sm text-gray-600">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter waste address"
          required
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <label className="block mb-2 text-sm text-gray-600">Waste Level</label>
        <div className="flex gap-8 w-full border border-gray-300 [&>*]:px-5 [&>*]:py-3 [&>*]:border rounded mb-6">
          <div
            className="bg-gray-800/10 "
            onClick={() => {
              setLevel(1);
            }}
          >
            1
          </div>
          <div
            className="bg-gray-800/25 "
            onClick={() => {
              setLevel(2);
            }}
          >
            2
          </div>
          <div
            className="bg-gray-800/40 "
            onClick={() => {
              setLevel(3);
            }}
          >
            3
          </div>
          <div
            className="bg-gray-800/65 "
            onClick={() => {
              setLevel(4);
            }}
          >
            4
          </div>
          <div
            className="bg-gray-800/80"
            onClick={() => {
              setLevel(5);
            }}
          >
            5
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-600 font-medium">
            Upload Image
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="px-3 py-1 bg-white border rounded hover:bg-gray-200 transition"
              onClick={() => fileRef.current.click()}
            >
              Choose File
            </button>
            <span className="text-sm text-gray-600">{filename}</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFile(e);
            }}
            ref={fileRef}
            name="file"
            className="hidden"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 "
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestPickup;
