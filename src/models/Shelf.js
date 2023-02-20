module.exports = (sequelize, DataTypes) => {
  const Shelf = sequelize.define(
    "Shelf",
    {
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      underscored: true,
      timestamps: false
    }
  );
  return Shelf;
};
