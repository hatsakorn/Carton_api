module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true, timestamps: false }
  );

  Invoice.associate = (db) => {
    Invoice.belongsTo(db.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Invoice;
};
