/**
 * file: imageRoute.js
 * description: image 불러오기 라우터
 * writer: lee hwan soo
 */

'use strict';

const express = require('express');
// const { authenticate } = require('../middleware/authorizer');
const { findImageById } = require('../service/imageService');
const route = express.Router();

route.get('/:imageId', findImageById);

module.exports = route;
