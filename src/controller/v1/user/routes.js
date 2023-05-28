const express = require('express');
const userRouter = express.Router();

const user = require('./authentication');

userRouter.post('/register', user.register);

module.exports = { userRouter };
