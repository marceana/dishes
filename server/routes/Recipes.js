const express = require("express");
const router = express.Router();
const { Recipes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  const listOfRecipes = await Recipes.findAll({ where: { userId: userId } });
  res.json(listOfRecipes);
});

router.post("/", validateToken, async (req, res) => {
  const recipe = req.body;
  const username = req.user.username;
  const userId = req.user.id;
  recipe.username = username;
  recipe.userId = userId;
  await Recipes.create(recipe);
  res.json(recipe);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipes.findByPk(id);
  res.json(recipe);
});

module.exports = router;
