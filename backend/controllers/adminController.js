//can view all the waste requests
//modify the request status
//assign pickup to workers - advanced
const WasteReport = require("../models/wasteReport");
const viewRequests = async (req, res) => {
  try {
    const reports = await WasteReport.find();
    res.status(200).json(reports);
  } catch (err) {}
};

const updateStatus = async (req, res) => {
  try {
    const updatedReport = await WasteReport.findByIdAndUpdate(
      id,
      { status: req.status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "report not found" });
    }
    res.status(200).json(updatedReport);
  } catch (err) {}
};

module.exports = { viewRequests, updateStatus };
