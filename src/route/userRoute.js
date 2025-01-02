/**
 * file: userRoute.js
 * description: user service 라우터
 * writer: lee hwan soo
 */

'use strict';

const express = require('express');
const { checkErrors } = require('../middleware/errorHandler');
const { validateLogin } = require('../middleware/loginValidator');
const { authenticate, authorize } = require('../middleware/authorizer');
const {
  findUsers,
  loginUser,
  findProgressByUser,
} = require('../service/userService');
const route = express.Router();

route.post('/login', validateLogin(), checkErrors, loginUser);
route.get('/progress', authenticate, findProgressByUser);
route.get('/', authenticate, authorize(['admin']), findUsers);

module.exports = route;
