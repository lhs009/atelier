/**
 * file: caseRepository.js
 * description: testCases DB 처리
 * writer: lee hwan soo
 */

'use strict';

const { execQuery } = require('../lib/dbHelper');

async function dbFindCases(userId) {
  const sql = `select 
                  c.caseId as caseId, 
                  c.title as title, 
                  c.description as description, 
                  c.startDate as startDate, 
                  c.endDate as endDate 
                from testers t 
                inner join testCases c on t.caseId = c.caseId
                where t.userId = ? and c.status = ?;`;

  return execQuery(sql, [userId, 1]);
}

module.exports = {
  dbFindCases,
};
