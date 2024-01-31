const { User } = require("../models/userModel");

const peopleController = async (req, res) => {
  const users = await User.find({}, { _id: 1, firstName: 1, lastName: 1 });
  res.json(users);
  console.log(users);
};

module.exports = peopleController;
