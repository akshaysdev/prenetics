const { container } = require('../utils/dependencyInjection');

const userService = container.resolve('userService');
const blogService = container.resolve('blogService');

module.exports = { userService, blogService };
