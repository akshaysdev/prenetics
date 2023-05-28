const express = require('express');
const blogRouter = express.Router();

const blog = require('./blog');
const { authenticateJWT } = require('../../../utils/passportJwt');

blogRouter.post('/create', authenticateJWT, blog.create);

blogRouter.patch('/update/:id', authenticateJWT, blog.update);

blogRouter.delete('/delete/:id', authenticateJWT, blog.delete);

blogRouter.get('/read/:id', authenticateJWT, blog.read);

blogRouter.get('/read-owned', authenticateJWT, blog.readOwned);

blogRouter.get('/all', authenticateJWT, blog.readAll);

module.exports = { blogRouter };
