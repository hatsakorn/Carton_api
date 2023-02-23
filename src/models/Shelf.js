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

  Shelf.associate = (db) => {
    Shelf.hasMany(db.Items, {
      foreignKey: {
        name: "shelfId"
      },
      onDelete: "RESTRICT"
    });

    Shelf.belongsTo(db.Warehouse, {
      foreignKey: {
        name: "warehouseId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Shelf;
};
