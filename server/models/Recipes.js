module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define("Recipes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("ingredients").split(";");
      },
      set(value) {
        Array.isArray(value)
          ? this.setDataValue("ingredients", value.join(";"))
          : this.setDataValue("ingredients", value);
      },
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("instructions").split(";");
      },
      set(value) {
        Array.isArray(value)
          ? this.setDataValue("instructions", value.join(";"))
          : this.setDataValue("instructions", value);
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Recipes;
};
