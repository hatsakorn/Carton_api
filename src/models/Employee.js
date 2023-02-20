const { USER_EMPLOYEE, USER_ADMIN } = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      telephoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      role: {
        type: DataTypes.ENUM(USER_EMPLOYEE, USER_ADMIN),

        allowNull: false,
        defaultValue: USER_EMPLOYEE
      }
    },
    { underscored: true, timestamps: false }
  );
  Employee.associate = (db) => {
    Employee.hasMany(db.Task, {
      foreignKey: {
        name: "employeeId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Employee;
};
