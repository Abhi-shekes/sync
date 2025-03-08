const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const sendRequest = require("../controllers/friendController/sendRequest");
const handleRequest = require("../controllers/friendController/handleRequest");

router.post("/request/:userId", auth, sendRequest);
router.put("/request/:requestId", auth, handleRequest);

module.exports = router;
