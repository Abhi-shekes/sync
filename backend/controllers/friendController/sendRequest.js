const User = require("../../models/user");

const sendRequest = async (req, res) => {
  try {
    const receiver = await User.findById(req.params.userId);
    if (!receiver)
      return res.status(404).json({
        status: "error",
        message: "User not found",
        data: null
      });

    // Check if request already exists
    const existingRequest = receiver.friendRequests.find(
      (request) => request.sender.toString() === req.user.id
    );
    if (existingRequest)
      return res.status(400).json({
        status: "error",
        message: "Friend request already sent",
        data: null
      });

    receiver.friendRequests.push({ sender: req.user.id, status: "pending" });
    await receiver.save();
    
    res.json({
      status: "success",
      message: "Friend request sent",
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

module.exports = sendRequest;
