const { UserSchema } = require('./schema');

module.exports = class UserModel {
  constructor({ sequelize }) {
    UserSchema(sequelize);
    this.repository = sequelize.models.User;
  }

  async create(userObject) {
    try {
      const user = await this.repository.create(userObject);

      return user;
    } catch (error) {
      error.meta = { ...error.meta, 'UserModel.create': { userObject } };
      throw error;
    }
  }

  async findById(userId) {
    try {
      const user = (
        await this.repository.findAll({
          raw: true,
          where: {
            id: userId,
          },
          attributes: ['id', 'email'],
        })
      )[0];

      return user;
    } catch (error) {
      error.meta = { ...error.meta, 'UserModel.findById': { userId } };
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const user = (
        await this.repository.findAll({
          raw: true,
          where: {
            email,
          },
          attributes: ['id', 'email', 'password'],
        })
      )[0];

      return user;
    } catch (error) {
      error.meta = { ...error.meta, 'UserModel.findByEmail': { email } };
      throw error;
    }
  }
};
