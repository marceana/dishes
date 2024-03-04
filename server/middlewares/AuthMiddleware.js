const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  console.log(req.accessToken);
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    if (validToken) {
      return next();
    }
  } catch (e) {
    return res.json({ error: "User not logged in" });
  }
};

module.exports = { validateToken };
