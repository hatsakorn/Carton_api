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

  Shelf.associate = db => {
    Shelf.hasMany(db.Invoice,{
      foreignKey: {
        name: 'shelfId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  }
  return Shelf;
};
