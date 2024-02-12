const jwt = require('jsonwebtoken');
const { User } = require("../models/userModel");

const profileController = async (req, res) => {
  const token = req.cookies?.authToken;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
      console.log(userData);
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
};
const profileUpdate = async (req, res) => {
  const token = req.cookies?.authToken;
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
      if (err) throw err;
    });
  } else {
    res.status(401).json("no token");
  }

  const { firstName, lastName, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.save();
  }
  res.json(user);
};

module.exports = { profileController, profileUpdate };
