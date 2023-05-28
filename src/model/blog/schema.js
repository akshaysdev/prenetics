// const Schema = require('mongoose').Schema;

// const BlogSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   authorId: {
//     type: String,
//     required: true,
//     index: true,
//   },
//   authorName: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = (mongoDb) => {
//   return mongoDb.model('Blog', BlogSchema);
// };

const { DataTypes } = require('sequelize');

const BlogSchema = async (sequelize) => {
  await sequelize.define(
    'Blog',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      index: [
        {
          unique: true,
          fields: ['id', 'title', 'authorId'],
        },
      ],
    }
  );
};

module.exports = { BlogSchema };
