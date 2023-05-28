const { UserSchema } = require('./schema');

module.exports = class UserModel {
  constructor({ sequelize }) {
    UserSchema(sequelize);
    this.model = sequelize.models.User;
  }

  async create(userObject) {
    try {
      const user = await this.model.create(userObject);

      return user;
    } catch (error) {
      error.meta = { ...error.meta, 'UserModel.create': { userObject } };
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const user = (
        await this.model.findAll({
          raw: true,
          where: {
            email,
          },
          attributes: ['id', 'email', 'username', 'password'],
        })
      )[0];

      return user;
    } catch (error) {
      error.meta = { ...error.meta, 'UserModel.findByEmail': { email } };
      throw error;
    }
  }

  async findById(id) {
    try {
      const user = (
        await this.model.findAll({
          raw: true,
          where: {
            id,
          },
          attributes: ['id', 'username'],
        })
      )[0];

      return user;
    } catch (error) {
      error.meta = { ...error.meta, 'UserModel.findById': { id } };
      throw error;
    }
  }
};
