const { BlogSchema } = require('./schema');

module.exports = class BlogModel {
  constructor({ mongoDb, sequelize }) {
    // this.model = BlogSchema(mongoDb);
    BlogSchema(sequelize);
    this.model = sequelize.models.Blog;
  }

  async create(blogObject) {
    try {
      const blog = await this.model.create(blogObject);
      return blog;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.create': { blogObject } };
      throw error;
    }
  }

  async update(blogId, updateObject) {
    try {
      const blog = (
        await this.model.update(updateObject, {
          returning: true,
          plain: true,
          raw: true,
          where: {
            id: blogId,
          },
        })
      )[1];
      console.log(`🚀 ~ file: index.js:32 ~ BlogModel ~ update ~ blog:`, blog)

      return blog;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.update': { blogId, updateObject } };
      throw error;
    }
  }

  async delete(blogId) {
    try {
      const deleted = await this.model.destroy({ where: { id: blogId } });

      return deleted;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.delete': { blogId } };
      throw error;
    }
  }

  async read(blogId) {
    try {
      const blog = await this.model.findByPk(blogId);
      console.log(`🚀 ~ file: index.js:51 ~ BlogModel ~ read ~ blog:`, blog);

      return blog;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.read': { blogId } };
      throw error;
    }
  }

  async readOwned(userId) {
    try {
      const blogs = await this.model.findAll({
        where: {
          authorId: userId,
        },
      });
      console.log(`🚀 ~ file: index.js:67 ~ BlogModel ~ readOwned ~ blogs:`, blogs);

      return blogs;
    } catch (error) {
      error.meta = { ...error.meta, 'BlogModel.readOwned': { userId } };
      throw error;
    }
  }

  async readAll() {
    try {
      const blogs = await this.model.findAll();
      console.log(`🚀 ~ file: index.js:79 ~ BlogModel ~ readAll ~ blogs:`, blogs);

      return blogs;
    } catch (error) {
      throw error;
    }
  }
};
