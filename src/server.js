/**
 * file: server.js
 * description: application main
 * writer: lee hwan soo
 */

'use strict';

// configure process environments
require('./common/config')();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const httpStatus = require('./common/httpStatus');
const logger = require('./lib/loggerUtil');
const userRoute = require('./route/userRoute');
const testRoute = require('./route/testRoute');
const promptRoute = require('./route/promptRoute');
const caseRoute = require('./route/caseRoute');
const imageRoute = require('./route/imageRoute');
const dataRoute = require('./route/dataRoute');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use('/users', userRoute);
app.use('/tests', testRoute);
app.use('/prompts', promptRoute);
app.use('/cases', caseRoute);
app.use('/images', imageRoute);
app.use('/datas', dataRoute);

app.get('/', (req, res) => {
  res.json({ result: `I am great. Don't worry!!!` });
});

app.get('/env', (req, res) => {
  res.json({ env: process.env });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpStatus.ResourceNotFound);
});

// error handler
// 에러 처리 핸들러
app.use((err, req, res, next) => {
  logger.info(`[error] - ${err.message},${err.status}`);
  res.status(err.status || 500);
  res.json(err);
});

app.listen(3000, () => {
  logger.info('started on the port 3000');
});
