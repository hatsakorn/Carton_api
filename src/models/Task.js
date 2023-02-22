module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      task: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true, timestamps: false }
  );

  Task.associate = (db) => {
    Task.belongsTo(db.Items, {
      foreignKey: {
        name: "itemId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Task.belongsTo(db.Employee, {
      foreignKey: {
        name: "employeeId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Task;
};
