const express = require("express");
const router = express.Router();
const { Recipes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const listOfRecipes = await Recipes.findAll({
      where: { userId },
    });

    return res.json(listOfRecipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", validateToken, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    const recipe = {
      ...req.body,
      username: req.user.username,
      userId: req.user.id,
    };

    const newRecipe = await Recipes.create(recipe);

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const recipe = await Recipes.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        error: "Recipe not found",
      });
    }

    return res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:recipeId", validateToken, async (req, res) => {
  try {
    const recipe = await Recipes.findByPk(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({
        error: "Recipe not found",
      });
    }

    if (recipe.userId !== req.user.id) {
      return res.status(403).json({
        error: "Not authorized to delete this recipe",
      });
    }

    await Recipes.destroy({
      where: { id: req.params.recipeId },
    });

    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
