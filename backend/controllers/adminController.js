//can view all the waste requests
//modify the request status
//assign pickup to workers - advanced
const WasteReport = require("../models/wasteReport");
const viewRequests = async (req, res) => {
  try {
    const reports = await WasteReport.find();
    return res.status(200).json({ reports: reports });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong while fetching requests" });
  }
};

const updateStatus = async (req, res) => {
  try {
    console.log(req.body.id, req.body.newStatus);
    const updatedReport = await WasteReport.findByIdAndUpdate(
      req.body.id,
      { status: req.body.newStatus },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "report not found" });
    }
    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await WasteReport.findByIdAndDelete(id);
    return res.status(200);
  } catch (err) {}
};

module.exports = { viewRequests, updateStatus, deleteRequest };
