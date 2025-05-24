// can get thier own profile from database
//can get all the requests made till by the user
import User from "../models/user";
const getProfile = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.email });
    if (user) {
      let userProfile = { name: user.name, email: user.email, phone: user.pno };
      res.status(200).json(userProfile);
    }
  } catch (err) {
    console.log("something went wrong while retrieving the profile");
  }
};
const getAllRequests = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.email }).populate("reports");
    if (user) {
      res.status(200).json(user.reports);
    }
  } catch (err) {
    console.log("something went wrong while retrieving ");
  }
};

module.exports = { getProfile, getAllRequests };
