import WasteReport from "../models/wasteReport";

const createCleanupRequest = async (req, res) => {
  try {
    const { address, level, created_by, created_at } = req.body;
    const newWasteReport = await WasteReport.create({
      address,
      level,
      created_by,
      created_at,
    });
    res.status(200).send("report created sucessfully");
  } catch (err) {}
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
