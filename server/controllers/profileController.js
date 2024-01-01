const { User } = require("../models/userModel.js");

const profileController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); //find user by id
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in ProfileController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = profileController;
