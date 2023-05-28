const express = require('express');
const userRouter = express.Router();

const auth = require('./authentication');

const { authenticateJWT } = require('../../../utils/passportJwt');

userRouter.post('/register', auth.register);

userRouter.post('/login', auth.login);

userRouter.get('/protected', authenticateJWT, async (req, res) => {
  try {
    res.status(200).send({ success: true, message: 'User is accessing protected route!' });
  } catch (error) {
    res.status(error.status || 500).send(response(error));
  }
});

module.exports = { userRouter };
