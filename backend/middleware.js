const jwt = require("jsonwebtoken");

function middleware(req, res, next) {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ msg: "No token, access denied" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.id; // userId stored in JWT
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = middleware;
