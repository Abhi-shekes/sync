const Post = require("../../models/post");
const cloudinary = require("../../config/cloudinary");

const editPost = async (req, res) => {
  try {
    const { title, content, caption } = req.body;
    const postId = req.params.id;
    let mediaUrls = [];

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
        data: null,
      });
    }

    // Check if any new media files are uploaded
    if (req.files && req.files.length > 0) {
      // Upload each file to Cloudinary
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        mediaUrls.push(result.secure_url);
      }
      post.media = mediaUrls;
    }

    // Update fields if provided
    post.title = title || post.title;
    post.content = content || post.content;
    post.caption = caption || post.caption;

    // Save the updated post
    await post.save();

    res.json({
      status: "success",
      message: "Post updated successfully",
      data: post,
    });
  } catch (err) {
    console.error("Error updating the post:", err);
    res.status(500).json({
      status: "error",
      message: "Server error",
      data: null,
    });
  }
};

module.exports = editPost;
