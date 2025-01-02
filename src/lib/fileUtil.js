/**
 * file: fileUtil.js
 * writer: lee hwan soo
 * description: file 처리 함수 모음...
 */

'use strict';

const fs = require('fs/promises');

const save = async (buf, filePath) => {
  return fs.writeFile(filePath, buf);
};

const read = async (filepath) => {
  return fs.readFile(filepath);
};

const exists = async (filePath) => {
  return fs
    .stat(filePath)
    .then((s) => true)
    .catch((err) => false);
};

module.exports = {
  exists,
  save,
  read,
};
