/**
 * file: promptRepository.js
 * description: prompts db 처리
 * writer: lee hwan soo
 */

'use strict';

const { execQuery } = require('../lib/dbHelper');

async function dbFindPrompts(offset, limit) {
  const sql = `select * from prompts limit ?, ?`;
  return execQuery(sql, [+offset, +limit]);
}

async function dbGetTestPromptCountByCaseId(caseId) {
  const sql = `select count(*) as count from prompts where caseId = ? and status = 1`;
  const rows = await execQuery(sql, [+caseId]);
  return rows[0];
}

async function dbFindImagesByPromptId(promptId) {
  const sql = `select 
                p.promptId as promptId, 
                p.caption as caption,
                c.imageId as imageId,
                c.uid as uid,
                c.url as url,
                m.name as modelName
                from prompts p
                inner join createdImages c on p.promptId = c.promptId
                inner join models m on c.modelId = m.modelId
                where p.promptId = ?`;

  return execQuery(sql, [+promptId]);
}

module.exports = {
  dbFindPrompts,
  dbGetTestPromptCountByCaseId,
  dbFindImagesByPromptId,
};
