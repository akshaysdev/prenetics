const express = require('express');
const userRouter = express.Router();

const auth = require('./authentication');

userRouter.post('/register', auth.register);

userRouter.post('/login', auth.login);

module.exports = { userRouter };
