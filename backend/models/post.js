const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "posts", required: true },
  media: [{ type: String }], // Cloudinary URLs
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  comments: [
    {
      text: { type: String, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", postSchema);