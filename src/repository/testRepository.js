/**
 * file: testRepository.js
 * description: test db 처리
 * writer: lee hwan soo
 */

'use strict';

const { execQuery } = require('../lib/dbHelper');
const pool = require('../lib/dbManager').getInstance().getPool();

async function dbFindTestCases(offset, limit) {
  const sql = `select * from testCases limit ?, ?`;
  return execQuery(sql, [+offset, +limit]);
}

async function dbFindTestByUser(userId, caseId, offset, limit) {
  const sql = `
      select 
        p.promptId as promptId, p.caption as caption, 
        c.imageId as imageId, c.uid as uid, c.url as url, 
        m.name as modelName 
        from (
          select p.promptId as promptId, p.caption as caption from prompts as p
          left join (select userId, promptId from abTestLogs where userId = ?) as a 
          on p.promptId = a.promptId
          where p.status = 1
          and p.caseId = ?
          and a.promptId is null
          limit ?, ?
        ) p
      inner join createdImages as c on p.promptId = c.promptId
      inner join models as m on c.modelId = m.modelId
      order by p.promptId;
  `;

  const bindParams = [+userId, +caseId, +offset, +limit];
  return execQuery(sql.trim(), bindParams);
}

// log insert 후 해당 프롬프트 testCount 누적 업데이트 +3 (사용자 prompt 당 3번 테스트)
// 트랜잭션 처리, 실패 시 롤백...
async function dbCreateLogByUser(promptId, logs) {
  let dbconn;
  let addCnt = logs.length;

  try {
    const sqlInsert = `
      insert into abTestLogs 
        (userId, promptId, model0, model1, hasLabel, label0, label1, image0uid, image1uid) 
      values ?`;

    const sqlUpdate = `
      update prompts set testCount = testCount + ?
      where promptId = ?`;

    dbconn = await pool.getConnection(async (conn) => conn);
    await dbconn.beginTransaction();
    await Promise.all([
      dbconn.execute(dbconn.format(sqlInsert, [logs])),
      dbconn.execute(dbconn.format(sqlUpdate, [addCnt, +promptId])),
    ]);
    await dbconn.commit();
  } catch (error) {
    if (dbconn) {
      await dbconn.rollback();
    }
    throw error;
  } finally {
    if (dbconn) {
      dbconn.release();
    }
  }
}

module.exports = {
  dbFindTestCases,
  dbFindTestByUser,
  dbCreateLogByUser,
};
