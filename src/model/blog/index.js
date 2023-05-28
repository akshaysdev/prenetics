const createError = require('http-errors');

const { fetchBlogsQuery } = require('./query');
const BlogSchema = require('./schema');

module.exports = class BlogModel {
  constructor({ mongoDb, sequelize }) {
    this.model = BlogSchema(mongoDb);
  }

  async create(blogObject) {
    try {
      const blog = await this.model.create(blogObject);
      return blog;
    } catch (error) {
      if (error.code === 11000) {
        throw createError(409, 'Title already exists', { meta: { blogObject } });
      }
      error.meta = { ...error.meta, 'BlogModel.create': { blogObject } };
      throw error;
    }
  }

  async update(blogId, updateObject) {
    try {
      const blog = await this.model.findByIdAndUpdate(blogId, updateObject, { new: true, lean: true });

      return blog;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.update': { blogId, updateObject } };
      throw error;
    }
  }

  async delete(blogId) {
    try {
      const deleted = await this.model.deleteOne({ _id: blogId });

      return deleted;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.delete': { blogId } };
      throw error;
    }
  }

  async read(blogId) {
    try {
      const blog = await this.model.findById(blogId);

      return blog;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.read': { blogId } };
      throw error;
    }
  }

  async readOwned({ userId, pageNumber, limit }) {
    try {
      const query = fetchBlogsQuery({ userId, pageNumber, limit });

      const blogs = await this.model.aggregate(query).allowDiskUse(true).exec();

      return blogs;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.readOwned': { userId, pageNumber, limit } };
      throw error;
    }
  }

  async readAll({ pageNumber, limit }) {
    try {
      const query = fetchBlogsQuery({ pageNumber, limit });

      const blogs = await this.model.aggregate(query).allowDiskUse(true).exec();

      return blogs;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.readAll': { pageNumber, limit } };
      throw error;
    }
  }
};
