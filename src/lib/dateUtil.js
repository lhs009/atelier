/**
 * file: dataUtil.js
 * writer: lee hwan soo
 * description: date 처리 함수 모음...
 */

'use strict';

function pad(number, length) {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear().toString();
  const MM = pad(date.getMonth() + 1, 2);
  const dd = pad(date.getDate(), 2);
  return yyyy + MM + dd;
}

function getYYYYMMDDHHMMSS() {
  const date = new Date();
  const yyyy = date.getFullYear().toString();
  const MM = pad(date.getMonth() + 1, 2);
  const dd = pad(date.getDate(), 2);
  const hh = pad(date.getHours(), 2);
  const mm = pad(date.getMinutes(), 2);
  const ss = pad(date.getSeconds(), 2);

  return yyyy + MM + dd + hh + mm + ss;
}

module.exports = {
  getToday,
  getYYYYMMDDHHMMSS,
};
