/**
 * file: testRoute.js
 * description: test service 라우터
 * writer: lee hwan soo
 */

'use strict';

const express = require('express');
const { validateLog } = require('../middleware/logValidator');
const { checkErrors } = require('../middleware/errorHandler');
const { authenticate } = require('../middleware/authorizer');
const { findTestByUser, createLogByUser } = require('../service/testService');
const route = express.Router();

route.get('/:caseId', authenticate, findTestByUser);
route.post('/logs', validateLog(), checkErrors, authenticate, createLogByUser);

module.exports = route;
