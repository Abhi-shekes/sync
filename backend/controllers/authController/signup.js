const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password )
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        status: "error",
        message: "User already exists",
        data: null
      });

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({
        status: "success",
        message: "User registered successfully",
        data: { token }
      });
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      data: null
    });
  }
};

module.exports = signup;
