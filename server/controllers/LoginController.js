const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email });
    console.log("userdatabase ", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("password match ", passwordMatch);
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
    console.log("Error in LoginUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { LoginUser };
