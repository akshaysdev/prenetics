const Schema = require('mongoose').Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = (mongoDb) => {
  return mongoDb.model('Blog', BlogSchema);
};
