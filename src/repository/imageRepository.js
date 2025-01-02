/**
 * file: imageRepository.js
 * description: image 정보 처리
 * writer: lee hwan soo
 */

'use strict';

const { execQuery } = require('../lib/dbHelper');

async function dbFindImageById(imageId) {
  const sql = `select * from createdImages where imageId = ?`;

  const rows = await execQuery(sql, [+imageId]);
  return rows[0];
}

module.exports = { dbFindImageById };
