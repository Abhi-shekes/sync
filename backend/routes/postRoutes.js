const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const createPost = require("../controllers/postController/createPost");
const getAllPosts = require("../controllers/postController/getAllPosts");
const deletePost = require("../controllers/postController/deletePost");

const upload = multer({ dest: "uploads/" });

router.post("/", auth, upload.array("media"), createPost);
router.get("/", getAllPosts);
router.delete("/:id", auth, deletePost);

module.exports = router;
