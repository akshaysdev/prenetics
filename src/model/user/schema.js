const { DataTypes } = require('sequelize');

const UserSchema = async (sequelize) => {
  await sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      index: [
        {
          unique: true,
          fields: ['id', 'email'],
        },
      ],
    }
  );
};

module.exports = { UserSchema };
