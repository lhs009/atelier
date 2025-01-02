/**
 * file: loggerUtil.js
 * writer: lee hwan soo
 * description: console log level 적용 함수
 */

'use strict';

const _error = (...args) => {
  console.error(...args);
};

const _info = (...args) => {
  if (process.env.LOG_LEVEL !== 'error') console.info(...args);
};

const _debug = (...args) => {
  if (!process.env.LOG_LEVEL || process.env.LOG_LEVEL === 'debug') {
    console.debug(...args);
  }
};

const _log = (...args) => {
  console.log(...args);
};

module.exports = {
  error: _error,
  info: _info,
  debug: _debug,
  log: _log,
};
