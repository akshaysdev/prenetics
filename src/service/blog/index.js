const createError = require('http-errors');

module.exports = class BlogService {
  constructor({ blogModel }) {
    this.blogModel = blogModel;
  }

  async validate(blog) {
    try {
      if (!blog.title) {
        throw createError(422, 'Title is required');
      }

      if (!blog.description) {
        throw createError(422, 'Description is required');
      }

      if (!blog.content) {
        throw createError(422, 'Content is required');
      }

      return true;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogService.validate': { blog } };
      throw error;
    }
  }

  async create(user, blogObject) {
    try {
      await this.validate(blogObject);

      blogObject.authorId = user.id;
      blogObject.authorName = user.username;

      const blog = await this.blogModel.create(blogObject);

      return { blog, message: 'Blog is Created' };
    } catch (error) {
      error.meta = { ...error.meta, 'BlogService.create': { user, blogObject } };
      throw error;
    }
  }

  async update(blogId, updateObject) {
    try {
      const blog = await this.blogModel.update(blogId, updateObject);

      //   if (!blog.modifiedCount) {
      //     throw createError(304, 'Blog is not modified');
      //   }

      return { blog, message: 'Blog is updated' };
    } catch (error) {
      error.meta = { ...error.meta, 'BlogService.update': { blogId, updateObject } };
      throw error;
    }
  }

  async delete(blogId) {
    try {
      const deleted = await this.blogModel.delete(blogId);

      if (!deleted) {
        throw createError(404, 'Blog doesnt exist / Failed to delete blog');
      }

      return { message: 'Blog is deleted' };
    } catch (error) {
      error.meta = { ...error.meta, 'BlogService.delete': { blogId } };
      throw error;
    }
  }

  async read(blogId) {
    try {
      const blog = await this.blogModel.read(blogId);

      return { blog, message: 'Blog is fetched' };
    } catch (error) {
      error.meta = { ...error.meta, 'BlogService.read': { blogId } };
      throw error;
    }
  }

  async readOwned(userId) {
    try {
      const blogs = await this.blogModel.readOwned(userId);

      return { blogs, message: 'Blogs owned are fetched' };
    } catch (error) {
      error.meta = { ...error.meta, 'BlogService.readOwned': { userId } };
      throw error;
    }
  }

  async readAll() {
    try {
      const blogs = await this.blogModel.readAll();

      return { blogs, message: 'Exctracted all blogs' };
    } catch (error) {
      throw error;
    }
  }
};
