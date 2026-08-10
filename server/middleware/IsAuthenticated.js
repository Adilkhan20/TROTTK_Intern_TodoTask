const jwt = require("jsonwebtoken");

const IsAuthenticated = async (req, res, next) => {
  const cleanToken = req.cookies.token;
  console.log("clean token", cleanToken);

  if (!cleanToken) {
    return res.status(401).json({ message: "Unauthorized. Token not found." });
  }
  const Decoded = jwt.verify(cleanToken, process.env.AccessToken);
  req.user = Decoded;

  next();
};

module.exports = IsAuthenticated;
