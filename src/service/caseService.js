/**
 * file: caseService.js
 * description: test case service
 * writer: lee hwan soo
 */

'use strict';
const logger = require('../lib/loggerUtil');
const httpStatus = require('../common/httpStatus');
const { dbFindCases } = require('../repository/caseRepository');

async function findCases(req, res, next) {
  try {
    const userId = req.user?.userId;
    let rs = await dbFindCases(userId);
    res.json({ cases: rs });
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

module.exports = {
  findCases,
};
