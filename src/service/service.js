const { container } = require('../utils/dependencyInjection');

const userService = container.resolve('userService');

module.exports = { userService };
