const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const RegisterUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(email, password, name);
    console.log("registeration is compeleted");
    console.log(password.length);
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide email and password and name" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashPassword, name });
    console.log("user is created successfully", user);
    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { RegisterUser };
