const { USER_EMPLOYYEE } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    'Employee',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      surname: {
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
        type: DataTypes.ENUM(USER_EMPLOYYEE, USER_ADMIN),

        allowNull: false,
        defaultValue: USER_EMPLOYYEE
      }
    },

    { underscored: true, timestamps: false }
  );
  return Employee;
};
