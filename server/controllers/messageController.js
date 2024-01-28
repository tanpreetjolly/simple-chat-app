const Message = require("../models/messageModel");
const jwt = require("jsonwebtoken");

async function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.authToken;
    if (token) {
      jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
        if (err) {
          reject(err);
        } else {
          resolve(userData);
        }
      });
    } else {
      reject("no token");
    }
  });
}


const messageController = async (req, res) => {
  const { userId } = req.params;
  const userData = await getUserDataFromRequest(req);
  console.log("userData", userData);

  const ourUserId = userData._id;
  console.log("ourUserId", ourUserId);
  console.log("userId", userId);

  const messages = await Message.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 });

  res.json(messages);
  console.log("messages", messages);
};

module.exports = messageController;
