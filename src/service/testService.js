/**
 * file: testService.js
 * description: test service
 * writer: lee hwan soo
 */

'use strict';

const logger = require('../lib/loggerUtil');
const httpStatus = require('../common/httpStatus');
const {
  dbFindTestCases,
  dbFindTestByUser,
  dbCreateLogByUser,
} = require('../repository/testRepository');
const { dbFindImagesByPromptId } = require('../repository/promptRepository');

async function findTests(req, res, next) {
  try {
    let rs = await dbFindTestCases(0, 100);
    res.json({ cases: rs });
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

/**
{
  "result": [
    {
      "promptId": 3,
      "caption": "Laboris magna laborum anim excepteur ex ullamco aliquip commodo dolor ex. Nostrud nostrud aliquip cillum culpa tempor aute non aute cupidatat do quis aliqua.",
      "images": [
        {
          "imageId": 249965,
          "url": "https://picsum.photos/512/512?random=58",
          "uid": "b356a39b-b0f5-4390-8907-77a0909df3af",
          "modelName": "model-v1"
        },
        ...
      ]
    },
    ...
  ]
} 
 */
function buildTestForUser(data) {
  let curPromptId = -1;
  let length = data.length;
  let prompts = [];
  let promptItem = { promptId: 0, caption: '', images: [] };

  for (let i = 0; i < length; i++) {
    let { promptId, caption, imageId, uid, url, modelName } = data[i];
    if (promptId !== curPromptId) {
      if (curPromptId !== -1) {
        prompts.push({ ...promptItem });
        promptItem = { promptId: 0, caption: '', images: [] };
      }
      curPromptId = promptId;
      promptItem.promptId = promptId;
      promptItem.caption = caption;
    }

    promptItem.images.push({ id: imageId, url, uid, modelName });
  }
  prompts.push({ ...promptItem });

  return { prompts };
}

async function findTestByUser(req, res, next) {
  try {
    const userId = req.user.userId;
    const caseId = req.params?.caseId;

    if (!userId || !caseId) {
      logger.debug(userId, caseId);
      return next(httpStatus.InvalidRequestData);
    }

    const offset = +req.query?.offset; // fetch 시작점
    const limit = +req.query?.limit; // fetch 최대값

    if (isNaN(offset) || isNaN(limit) || offset < 0 || limit <= 0) {
      logger.debug(offset, limit);
      return next(httpStatus.InvalidQueryRange);
    }

    let rs = await dbFindTestByUser(userId, caseId, offset, limit);
    res.json(buildTestForUser(rs));
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

const AbTestLog = {
  USERID: 0,
  PROMPTID: 1,
  MODEL0: 2,
  MODEL1: 3,
  HASLABEL: 4,
  LABEL0: 5,
  LABEL1: 6,
  IMAGE0UID: 7,
  IMAGE1UID: 8,
};

Object.freeze(AbTestLog);

function getDbImages(data) {
  let obj = { promptId: 0, caption: '', images: [] };

  for (let i = 0; i < data.length; i++) {
    let { promptId, caption, imageId, uid, url, modelName } = data[i];
    if (i === 0) {
      obj.promptId = promptId;
      obj.caption = caption;
    }
    obj.images.push({ imageId, uid, url, modelName });
  }
  return obj;
}

function checkImageIds(logImageIds, dbImageIds) {
  for (let imageId of logImageIds) {
    if (!dbImageIds.includes(imageId)) {
      logger.error(`error imageId: ${imageId}`);
      return false;
    }
  }
  return true;
}

/* return [ 
    [userId, promptId, model0, model1, hasLabel, label0, label1, image0uid, image1uid],
    [userId, promptId, model0, model1, hasLabel, label0, label1, image0uid, image1uid],
    [userId, promptId, model0, model1, hasLabel, label0, label1, image0uid, image1uid]
*/
function buildLogItems(userId, logs, dbData) {
  // log image id 무결성 체크
  const logImageIds = logs.map((log) => log.slice(0, 2)).flat();
  const dbImageIds = dbData.images.map((img) => img.imageId);
  if (!checkImageIds(logImageIds, dbImageIds)) {
    return null;
  }

  const promptId = dbData.promptId;
  const caption = dbData.caption;
  const images = dbData.images;

  let logItems = logs.map((log) => {
    let image0Id = log[0];
    let image1Id = log[1];
    let selected = log[2];
    let tie = log[3];
    let image0 = images.find((image) => image.imageId === image0Id);
    let image1 = images.find((image) => image.imageId === image1Id);

    let item = [];
    item[AbTestLog.USERID] = userId;
    item[AbTestLog.PROMPTID] = promptId;
    item[AbTestLog.MODEL0] = image0.modelName;
    item[AbTestLog.MODEL1] = image1.modelName;
    item[AbTestLog.HASLABEL] = tie; // tie check 되었으면 0, 아니면 1
    item[AbTestLog.LABEL0] = selected === 0 ? 1 : 0; // image0이 선택 되었으면 1 아님 0
    item[AbTestLog.LABEL1] = selected === 1 ? 1 : 0; // image1이 선택 되었으면 1 아님 0
    item[AbTestLog.IMAGE0UID] = image0.uid;
    item[AbTestLog.IMAGE1UID] = image1.uid;
    return item;
  });

  return logItems;
}

/*
Promt Id를 DB에서 쿼리해서 나머지 로그 정보 처리…
{
  promptId: 1,
  logs: [
    [imageId A, ImageId B, selected index (0, 1), tie info (0, 1)], 
    [ImageId A, ImageId B, selected index (0, 1), tie info (0, 1)],
    [ImageId A, ImageId B, selected index (0, 1), tie info (0, 1)],
  ]
}

Selected index: 선택된 image A, B ID의 배열 인덱스
Tie info : tie check 되었으면 0, 아니면 1
*/
async function createLogByUser(req, res, next) {
  try {
    const userId = req.user?.userId;
    const { promptId, logs } = req.body;
    logger.info(JSON.stringify({ userId, ...req.body }, null, 0));

    let rs = await dbFindImagesByPromptId(promptId);
    if (rs.length === 0) {
      return next(httpStatus.ContentNotFound);
    }

    let logItems = buildLogItems(userId, logs, getDbImages(rs));
    if (!logItems) {
      return next(httpStatus.InvalidRequestData);
    }
    // db insert
    await dbCreateLogByUser(promptId, logItems);
    res.status(201).json(logItems);
    //res.status(201).end();
  } catch (err) {
    logger.error(err);
    next(httpStatus.ServiceUnavailable);
  }
}

module.exports = {
  findTests,
  findTestByUser,
  createLogByUser,
  buildLogItems,
  getDbImages,
};
