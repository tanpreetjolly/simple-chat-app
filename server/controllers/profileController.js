const jwt = require('jsonwebtoken');

const profileController = async (req, res) => {
  const token = req.cookies?.authToken;
  console.log(token)
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
      console.log(userData);
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json('no token');
  }
};

module.exports = profileController;
