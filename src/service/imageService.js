/**
 * file: imageService.js
 * description: image service
 * writer: lee hwan soo
 */

'use strict';

const logger = require('../lib/loggerUtil');
const httpStatus = require('../common/httpStatus');
const { get } = require('../lib/s3Util');
const { dbFindImageById } = require('../repository/imageRepository');

async function findImageById(req, res, next) {
  try {
    const imageId = req.params.imageId;
    let rs = await dbFindImageById(imageId);
    if (!rs) {
      return next(httpStatus.ContentNotFound);
    }
    let splited = rs.url.split('/');
    const img = await get(`${splited.slice(4).join('/')}`, splited[3]);
    res.writeHead(200, { 'Context-Type': 'image/png' }); //보낼 헤더를 만듬
    res.write(await img.Body.transformToByteArray()); //본문을 만들고
    res.end(); //클라이언트에게 응답을 전송한다
  } catch (err) {
    logger.error(err);
    next(httpStatus.ContentNotFound);
  }
}
//03748_3.png

module.exports = {
  findImageById,
};
