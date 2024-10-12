// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const redisClient = require('../assets/redis/redisClient');

const checkBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Check if the token is blacklisted in Redis
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    next();
  } catch (error) {
    console.error("Error in checkBlacklist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const secretKey = process.env.JWT_SECRET || "jwt_secret_key";
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user; // Attach user info to the request
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticateJWT, checkBlacklist };
