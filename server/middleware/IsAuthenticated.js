const jwt = require("jsonwebtoken");

const IsAuthenticated = async (req, res, next) => {
  const Token = req.cookies.token;
  console.log("clean token", Token);

  if (!Token) {
    return res.status(401).json({ message: "Unauthorized. Token not found." });
  }
  const Decoded = jwt.verify(Token, process.env.AccessToken);
  req.user = Decoded;

  next();
};

module.exports = IsAuthenticated;
