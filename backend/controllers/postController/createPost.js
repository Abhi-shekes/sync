const Post = require("../../models/post");
const cloudinary = require("../../config/cloudinary");

const createPost = async (req, res) => {
  try {
    console.log("Received POST request to create a new post.");

    const { title, content, caption } = req.body;
    console.log("Request body:", { title, content, caption });

    let mediaUrls = [];

    // Check if files are uploaded
    if (req.files && req.files.length > 0) {
      console.log("Files found in request:", req.files.length);

      // Upload each file to Cloudinary
      for (const file of req.files) {
        console.log("Uploading file to Cloudinary:", file.path);
        const result = await cloudinary.uploader.upload(file.path);
        console.log("File uploaded to Cloudinary, URL:", result.secure_url);
        mediaUrls.push(result.secure_url);
      }
    } else {
      console.log("No files found in the request.");
      mediaUrls = []; // Set to an empty array
    }

    // Check if user exists in the request (auth middleware should provide this)
    const authorId = req.user?.id || "60d21b4667d0d8992e610c85";
    console.log("Author ID:", authorId);

    // Create a new Post instance
    const post = new Post({
      title,
      content,
      author: authorId,  // Assuming auth middleware attaches user to req
      media: mediaUrls,   // Set to empty array if no files are uploaded
      caption: caption || null, // Optional caption
    });

    // Save the post to the database
    console.log("Saving post to the database.");
    await post.save();

    console.log("Post created successfully:", post);
    res.json({
      status: "success",
      message: "Post created successfully",
      data: post,
    });

  } catch (err) {
    console.error("Error occurred while creating the post:", err);
    res.status(500).json({
      status: "error",
      message: "Server error",
      data: null,
    });
  }
};

module.exports = createPost;
