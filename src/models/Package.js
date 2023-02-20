module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    "Package",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      posterUrl: DataTypes.STRING
    },
    {
      underscored: true,
      timestamps: false
    }
  );

  Package.associate = db => {
    Package.hasMany(db.Items,{
      foreignKey: {
        name: 'packageId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  }
  return Package;
};
