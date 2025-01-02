/**
 * file: logValidator.js
 * description: test logs validator
 * writer: lee hwan soo
 */

'use strict';

const { checkSchema } = require('express-validator');

function logFieldValidator(item) {
  if (!Array.isArray(item) || item.length !== 4) {
    return { errorMessage: 'log item type or length error', isSuccess: false };
  }

  for (let i = 0; i < item.length; i++) {
    if (typeof item[i] !== 'number') {
      return { errorMessage: 'log item type error', isSuccess: false };
    }
  }
  return { errorMessage: '', isSuccess: true };
}

function validateLog() {
  return checkSchema({
    promptId: {
      isNumeric: {
        errorMessage: `type error, should be number`,
      },
    },
    logs: {
      isArray: {
        errorMessage: `type error, should be array`,
      },
      custom: {
        options: (values) => {
          for (let v of values) {
            // console.log(v);
            let { errorMessage, isSuccess } = logFieldValidator(v);
            if (!isSuccess) return Promise.reject(errorMessage);
          }
          return Promise.resolve();
        },
      },
    },
  });
}

module.exports = {
  validateLog,
};
