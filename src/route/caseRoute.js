/**
 * file: caseRoute.js
 * description: test case route
 * writer: lee hwan soo
 */

'use strict';

const express = require('express');
const { authenticate } = require('../middleware/authorizer');
const { findCases } = require('../service/caseService');

const route = express.Router();

route.get('/', authenticate, findCases);

module.exports = route;
