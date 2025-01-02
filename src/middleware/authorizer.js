/**
 * file: authorizer.js
 * description: user authenticate, authorize middleware
 * writer: lee hwan soo
 */

'use strict';

const httpStatus = require('../common/httpStatus');
const { verifyToken } = require('../lib/tokenUtil');
const { dbFindUserById } = require('../repository/userRepository');

async function authenticate(req, res, next) {
  try {
    let accessToken = req.cookies?.accessToken;
    if (!accessToken || !accessToken.token) {
      return next(httpStatus.UserNotAuthenticated);
    }

    let { isSuccess, data } = verifyToken(
      accessToken.token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!isSuccess) {
      if (data === 'TokenExpiredError') {
        return next(httpStatus.AccessTokenExpired);
      } else {
        return next(httpStatus.InvalidAccessToken);
      }
    }

    let user = await dbFindUserById(data.id);
    // console.log(user);
    if (!user || user.status != 1) {
      return next(httpStatus.UserNotFound);
    }
    req.user = { ...user, role: data.role };
    next();
  } catch (err) {
    return next(httpStatus.ServiceUnavailable);
  }
}

function authorize(permissions) {
  return (req, res, next) => {
    console.log(req.user);
    const userRole = req.user.role;
    if (permissions.includes(userRole)) {
      next();
    } else {
      next(httpStatus.UserNotAuthorized);
    }
  };
}

module.exports = {
  authenticate,
  authorize,
};
