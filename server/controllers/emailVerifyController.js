const { User } = require("../models/userModel.js");
const { Token } = require("../models/tokenModel.js");
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }

    if (user.verified) {
      return res.status(400).send({ message: "Email already verified" });
    }

    // Find the token for the user
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).send({ message: "Invalid Link" });
    }

    if (token.expiresAt < Date.now()) {
      user.verificationLinkSent = false;
      await user.save();
      return res.status(400).send({ message: "Verification link has expired" });
    }

    user.verified = true;
    await user.save();

    res.status(200).send({ message: "Email Verified Successfully" });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = verifyEmail;
