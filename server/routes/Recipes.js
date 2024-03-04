const express = require("express");
const router = express.Router();
const { Recipes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfRecipes = await Recipes.findAll();
  res.json(listOfRecipes);
});

router.post("/", validateToken, async (req, res) => {
  const recipe = req.body;
  await Recipes.create(recipe);
  res.json(recipe);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipes.findByPk(id);
  res.json(recipe);
});

module.exports = router;
