const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Changed 'name' to 'username'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  friendRequests: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "accepted", "rejected"] },
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
