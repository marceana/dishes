const express = require("express");
const router = express.Router();
const { Recipes } = require("../models");

router.get("/", async (req, res) => {
  const listOfRecipes = await Recipes.findAll();
  res.json(listOfRecipes);
});

router.post("/", async (req, res) => {
  const recipe = req.body;
  await Recipes.create(recipe);
  res.json(recipe);
});

module.exports = router;
