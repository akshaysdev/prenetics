const express = require('express');

const v1Routes = express.Router();

const { userRouter } = require('./user/routes');

const { blogRouter } = require('./blog/routes');

v1Routes.use('/auth', userRouter);

v1Routes.use('/blog', blogRouter);


module.exports = v1Routes;
