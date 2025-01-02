/**
 * file: loginValidator.js
 * description: login format validator
 * writer: lee hwan soo
 */

'use strict';

const { checkSchema } = require('express-validator');

function validateLogin() {
  return checkSchema({
    email: {
      exists: {
        errorMessage: 'email is required',
      },
      isEmail: {
        errorMessage: 'email is invalid',
      },
    },
    password: {
      exists: {
        errorMessage: 'password is required',
      },
    },
  });
}

module.exports = {
  validateLogin,
};
