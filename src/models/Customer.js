module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      telephoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      companyName: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {
      underscored: true,
      timestamps: false
    }
  );

  Customer.associate = db => {
    Customer.hasMany(db.Invoice,{
      foreignKey: {
        name: 'customerId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  }
  return Customer;
};
