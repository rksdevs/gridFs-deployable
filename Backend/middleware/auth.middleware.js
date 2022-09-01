const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

let authMiddleware = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(403).json({ info: "Auth Denied", type: "error" });
  }
  jwt.verify(token, keys.jwtPrivate, async (error, decoded) => {
    if (error) {
      return res.status(403).json({ info: "Unauthorized", type: "error" });
    } else {
      req.userId = decoded.id;

      next();
    }
  });
};

module.exports = authMiddleware;
