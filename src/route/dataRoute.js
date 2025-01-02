/**
 * file: dataRoute.js
 * description: data service 라우터
 * writer: hj.seong
 */

'use strict';

const express = require('express');
const { authenticate, authorize } = require('../middleware/authorizer');
const { findDatas } = require('../service/dataService');
const route = express.Router();

route.get('/', authenticate, authorize(['developer']), findDatas);

module.exports = route;
