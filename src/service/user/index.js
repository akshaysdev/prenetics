const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { validateEmail, validatePassword, hashPassword } = require('../../helpers/user');

module.exports = class UserService {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async validateRegistration({ username, email, password }) {
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
      await this.validateRegistration(userObject);

      userObject.password = hashPassword(userObject.password);

      await this.userModel.create(userObject);

      return { message: 'Registered Successfully!' };
    } catch (error) {
      error.meta = { ...error.meta, 'UserService.register': { userObject } };
      throw error;
    }
  }

  async validateLogin({ email, password }) {
    try {
      if (!email || !password) {
        throw createError(422, 'Both email and password is required');
      }

      const userCred = await this.userModel.findByEmail(email);
      if (!userCred) {
        throw createError(422, 'User does not exist');
      }

      return userCred;
    } catch (error) {
      error.meta = { ...error.meta, 'UserService.validateLogin': { email, password } };
      throw error;
    }
  }

  async login(userObject) {
    try {
      const userCreds = await this.validateLogin(userObject);

      const password = hashPassword(userObject.password);

      if (password !== userCreds.password) {
        throw createError(422, 'Incorrect email/password');
      }

      const token = jwt.sign({ username: userCreds.username, id: userCreds.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return { message: 'Logged-In Successfully!', token: `Bearer ${token}` };
    } catch (error) {
      error.meta = { ...error.meta, 'UserService.login': { userObject } };
      throw error;
    }
  }

  async findById(userId) {
    try {
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      error.meta = { ...error.meta, 'UserService.findById': { userId } };
      throw error;
    }
  }
};
