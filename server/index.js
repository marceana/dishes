require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

// Routers
const recipeRouter = require("./routes/Recipes");
const usersRouter = require("./routes/Users");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/recipes", recipeRouter);
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
