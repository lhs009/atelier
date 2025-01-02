/**
 * file: userRepository.js
 * description: user db 처리
 * writer: lee hwan soo
 */

'use strict';

const { execQuery } = require('../lib/dbHelper');

async function dbFindUsers(offset, limit) {
  const sql = `select * from users limit ?, ?`;
  return execQuery(sql, [+offset, +limit]);
}

async function dbFindUserByEmail(email) {
  const sql = `select * from users where email = ?`;
  const rows = await execQuery(sql, [email]);
  return rows[0];
}

async function dbGetTestCountByUser(userId, caseId) {
  const sql = `
    select count(*) as count from testers t 
      inner join prompts p on t.caseId = p.caseId
      inner join abTestLogs a on t.userId = a.userId and p.promptId = a.promptId
      where t.userId = ? and t.caseId = ?
  `;
  const rows = await execQuery(sql.trim(), [+userId, +caseId]);
  return rows[0];
}

async function dbFindUserById(userId) {
  const sql = `select * from users where userId = ?`;
  const rows = await execQuery(sql, [+userId]);
  return rows[0];
}

module.exports = {
  dbFindUsers,
  dbFindUserByEmail,
  dbFindUserById,
  dbGetTestCountByUser,
};
