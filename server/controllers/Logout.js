const User = require("../models/UserSchema");

const LogoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in LogoutUser:", error);
    return res.status(500).json({
      message: "Internal Server Error during logout",
      error: error.message,
    });
  }
};

module.exports = { LogoutUser };
