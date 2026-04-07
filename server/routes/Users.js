const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    const existingUser = await Users.findOne({ where: { username } });

    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await Users.create({
      username,
      password: hash,
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // (TOD0 - SHOULD BE TRUE IN PROD)
      sameSite: "lax",
    });

    return res.json({
      username: user.username,
      id: user.id,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/isAuthenticated", validateToken, (req, res) => {
  res.json(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // (TOD0 - SHOULD BE TRUE IN PROD)
  });

  return res.json({ message: "Logged out successfully" });
});

module.exports = router;
