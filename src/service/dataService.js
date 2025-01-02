/**
 * file: dataService.js
 * description: data service
 * writer: hj.seong
 */

'use strict';

const httpStatus = require('../common/httpStatus');
const logger = require('../lib/loggerUtil');
const { dbFindDatas } = require('../repository/dataRepository');

async function findDatas(req, res, next) {
  try {
    let rs = await dbFindDatas(0, 100);
    res.json({ datas: rs });
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

module.exports = {
  findDatas,
};
