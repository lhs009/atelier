/**
 * file: promptRoute.js
 * description: prompt service 라우터
 * writer: lee hwan soo
 */

'use strict';

const express = require('express');
const { findPrompts } = require('../service/promptService');
const route = express.Router();

route.get('/', findPrompts);

module.exports = route;
