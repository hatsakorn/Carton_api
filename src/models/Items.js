module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define(
    "Items",
    {
      details: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      contractStartDate: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      contractEndDate: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      dateIn: DataTypes.STRING,
      dateOut: DataTypes.STRING,
    },
    { underscored: true, timestamps: false }
  );

  Items.associate = (db) => {
    Items.hasOne(db.Task, {
      foreignKey: {
        name: "itemId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Items.belongsTo(db.Invoice, {
      foreignKey: {
        name: "invoiceId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Items.belongsTo(db.Shelf, {
      foreignKey: {
        name: "shelfId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Items.belongsTo(db.Package, {
      foreignKey: {
        name: "packageId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Items;
};
