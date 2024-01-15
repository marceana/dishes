const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
// Routers
const recipeRouter = require("./routes/Recipes");

app.use(express.json());
app.use(cors());
app.use("/recipes", recipeRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
