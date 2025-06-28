const WasteReport = require("../models/wasteReport");
const User = require("../models/user");
const createCleanupRequest = async (req, res) => {
  try {
    const { address, level } = req.body;
    const img_url = req.file ? `/uploads/${req.file.filename}` : null;
    const created_by = req.id;
    const newWasteReport = await WasteReport.create({
      address,
      level,
      created_by,
      img_url,
    });
    await User.findByIdAndUpdate(created_by, {
      $push: { reports: newWasteReport._id },
    });
    return res.status(200).json({ message: "request Submitted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `something happened while creating report : ${err.message}`,
    });
  }
};
const updateCleanupRequest = async (req, res) => {
  try {
    const id = req.params;
    const { level, address } = req.body;
    const updatedWasteReport = await WasteReport.findByIdAndUpdate(id, {
      level,
      address,
    });
    if (!updatedWasteReport) {
      return res.status(404).json({ message: "Waste report not found" });
    }
    return res.status(200);
  } catch (err) {}
};
const deleteCleanupRequest = async (req, res) => {
  try {
    const id = req.params;
    const deletedReport = await WasteReport.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Waste report not found" });
    }

    res
      .status(200)
      .json({ message: "Report deleted successfully", deletedReport });
  } catch (err) {}
};

module.exports = {
  createCleanupRequest,
  updateCleanupRequest,
  deleteCleanupRequest,
};
