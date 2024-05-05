const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await Users.create({
      username: username,
      password: hash,
    });

    res.json("SUCCESS");
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ error: "Wrong username and password combination" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    res.json({
      accessToken: accessToken,
      username: username,
      id: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

router.get("/isAuthenticated", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
