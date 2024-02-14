const { User } = require("../models/userModel");

const peopleController = async (req, res) => {
  const users = await User.find({ verified: true });
  res.json(users);
  // console.log(users);
};

module.exports = peopleController;
