/**
 * file: userService.js
 * description: user service
 * writer: lee hwan soo
 */

'use strict';

const httpStatus = require('../common/httpStatus');
const logger = require('../lib/loggerUtil');
const { getTokens } = require('../lib/tokenUtil');
const {
  dbFindUsers,
  dbFindUserByEmail,
  dbGetTestCountByUser,
} = require('../repository/userRepository');

const {
  dbGetTestPromptCountByCaseId,
} = require('../repository/promptRepository');

function getRole(userType) {
  let userRole = 'tester';

  if (userType === 1) {
    userRole = 'developer';
  } else if (userType === 2) {
    userRole = 'admin';
  }

  return userRole;
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    let rs = await dbFindUserByEmail(email, password);

    if (!rs || rs.status !== 1) {
      return next(httpStatus.UserNotFound);
    }

    if (password !== rs.password) {
      return next(httpStatus.InvalidPassword);
    }

    let accessToken = getTokens(rs.userId, getRole(rs.userType));

    res.cookie('accessToken', accessToken, {
      //expires: new Date(Date.now() + 60),
      httpOnly: true,
    });
    res.json({ accessToken });
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

async function findProgressByUser(req, res, next) {
  try {
    //const userId = req.user?.id;
    const userId = req.user.userId;
    const caseId = req.query?.caseId;

    if (!userId || !caseId) {
      logger.debug(userId, caseId);
      return next(httpStatus.InvalidRequestData);
    }

    let p = await Promise.all([
      dbGetTestCountByUser(userId, caseId),
      dbGetTestPromptCountByCaseId(caseId),
    ]);

    res.json({
      finished: p[0].count,
      total: p[1].count * 3,
    });
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

async function findUsers(req, res, next) {
  try {
    let rs = await dbFindUsers(0, 100);
    res.json({ users: rs });
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

module.exports = {
  loginUser,
  findProgressByUser,
  findUsers,
};
