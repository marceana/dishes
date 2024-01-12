module.exports = (sequelize, DataTypes) => {
  const Dishes = sequelize.define("Dishes", {
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
        this.setDataValue("ingredients", value.join(";"));
      },
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("instructions").split(";");
      },
      set(value) {
        this.setDataValue("instructions", value.join(";"));
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Dishes;
};
