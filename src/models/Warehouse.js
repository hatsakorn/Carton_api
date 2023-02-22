module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define(
    "Warehouse",
    {
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      underscored: true,
      timestamps: false
    }
  );

  Warehouse.associate = (db) => {
    Warehouse.hasMany(db.Shelf, {
      foreignKey: {
        name: "warehouseId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Warehouse;
};
