const User = require("../../models/user");

const handleRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const request = user.friendRequests.id(req.params.requestId);
    if (!request)
      return res.status(404).json({
        status: "error",
        message: "Friend request not found",
        data: null
      });

    request.status = req.body.status; // "accepted" or "rejected"
    await user.save();

    if (request.status === "accepted") {
      // Add to each other's friends list
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { friends: request.sender } });
      await User.findByIdAndUpdate(request.sender, { $addToSet: { friends: req.user.id } });
    }

    res.json({
      status: "success",
      message: `Friend request ${request.status}`,
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

module.exports = handleRequest;
