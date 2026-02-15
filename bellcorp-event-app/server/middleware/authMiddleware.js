const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    // remove "Bearer "
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protect;
