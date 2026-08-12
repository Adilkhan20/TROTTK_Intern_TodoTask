const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Login unsuccessful" });
    }
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.AccessToken, {
      expiresIn: "3d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
        token: token,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const LogoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "Logout Successfully " });
  } catch (error) {
    
    return res.status(500).json({
      message: "Internal Server Error during logout",
      error: error.message,
    });
  }
};
const RegisterUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide email and password and name" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashPassword, name });
    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { LoginUser, LogoutUser,RegisterUser };
