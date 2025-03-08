const Post = require("../../models/post");
const cloudinary = require("../../config/cloudinary");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const mediaUrls = [];

    // Upload files to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      mediaUrls.push(result.secure_url);
    }

    const post = new Post({
      title,
      content,
      author: req.user.id,
      media: mediaUrls,
    });

    await post.save();
    res.json({
      status: "success",
      message: "Post created successfully",
      data: post
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      data: null
    });
  }
};

module.exports = createPost;
