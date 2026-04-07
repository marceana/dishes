const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);

    req.user = validToken;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { validateToken };
