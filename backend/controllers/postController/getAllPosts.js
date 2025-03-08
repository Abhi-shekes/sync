const Post = require("../../models/post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
    res.json({
      status: "success",
      message: "Posts fetched successfully",
      data: posts
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      data: null
    });
  }
};

module.exports = getAllPosts;
