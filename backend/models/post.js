const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // Fixed the ref to "User"
  media: [{ type: String, default: null }], // Media can be null by default
  caption: { type: String }, // Caption for media (optional)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // Refers to User for likes
  comments: [
    {
      text: { type: String, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Fixed the ref to "User" for comments
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
