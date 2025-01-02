/**
 * file: promptService.js
 * description: prompt service
 * writer: lee hwan soo
 */

'use strict';

const logger = require('../lib/loggerUtil');
const httpStatus = require('../common/httpStatus');
const { dbFindPrompts } = require('../repository/promptRepository');

async function findPrompts(req, res, next) {
  try {
    let rs = await dbFindPrompts(0, 100);
    res.json({ prompts: rs });
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

module.exports = {
  findPrompts,
};
