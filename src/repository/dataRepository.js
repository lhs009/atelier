/**
 * file: dataRepository.js
 * description: abTestDataSets db 처리
 * writer: hj.seong
 */

'use strict';

const { execQuery } = require('../lib/dbHelper');

async function dbFindDatas(offset, limit) {
  const sql = `select * from abTestDataSets limit ?, ?`;
  return execQuery(sql, [+offset, +limit]);
}

module.exports = {
  dbFindDatas,
};
