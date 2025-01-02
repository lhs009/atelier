/**
 * file: tokenUtil.js
 * description: jwt token handler
 * writer: lee hwan soo
 */
'use strict';

const jwt = require('jsonwebtoken');

const generateToken = (secret, option, payload) => {
  let token = jwt.sign(payload, secret, option);
  return token;
};

const verifyToken = (token, secret) => {
  let result = {
    isSuccess: false,
    data: null,
  };
  try {
    const decoded = jwt.verify(token, secret);
    result.isSuccess = true;
    result.data = decoded;
  } catch (error) {
    // console.log(error);
    result.data = error.name;
  }
  return result;
};

function getTokens(id, role) {
  return {
    token: generateToken(
      process.env.ACCESS_TOKEN_SECRET,
      {
        issuer: process.env.TOKEN_ISSUER,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
      { id, role }
    ),
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  };
}

function getTokenFromHeader(headers) {
  let { authorization, Authorization } = headers;
  authorization = authorization || Authorization;
  const token = authorization && authorization.split(' ')[1];
  return token;
}

module.exports = {
  verifyToken,
  getTokens,
  getTokenFromHeader,
};
