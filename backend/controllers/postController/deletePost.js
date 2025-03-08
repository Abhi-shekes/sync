const Post = require("../../models/post");

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({
        status: "error",
        message: "Post not found",
        data: null
      });

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized",
        data: null
      });
    }

    await post.remove();
    res.json({
      status: "success",
      message: "Post deleted",
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      data: null
    });
  }
};

module.exports = deletePost;
