const createError = require('http-errors');

const { validateEmail, validatePassword, hashPassword } = require('../../helpers/user');

module.exports = class UserService {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async validate({ username, email, password }) {
    try {
      if (!username) {
        throw createError(422, 'Name is required');
      }

      if (!email) {
        throw createError(422, 'Email is required');
      }

      validateEmail(email);

      if (!password) {
        throw createError(422, 'Password is required');
      }
      validatePassword(password);

      const existingEmail = await this.userModel.findByEmail(email);
      if (existingEmail) {
        throw createError(400, 'Email already exists');
      }

      return true;
    } catch (error) {
      error.meta = { ...error.meta, 'UserService.validate': { email, password, username } };
      throw error;
    }
  }

  async register(userObject) {
    try {
      await this.validate(userObject);

      userObject.password = hashPassword(userObject.password);

      await this.userModel.create(userObject);

      return { message: 'Registered Successfully!' };
    } catch (error) {
      error.meta = { ...error.meta, 'UserService.register': { userObject } };
      throw error;
    }
  }
};
