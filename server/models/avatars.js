const mongoose = require("mongoose");

const AvatarSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      default: "https://i.imgur.com/qGsYvAK.png",
    },
  },
  { timestamps: true }
);

const Avatar = mongoose.model("Avatar", AvatarSchema);

module.exports = Avatar;
