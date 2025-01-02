/**
 * file: s3Util.js
 * description: s3 file upload
 * writer: lee hwan soo
 */
'use strict';

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { fromIni, fromEnv } = require('@aws-sdk/credential-providers');

const client = new S3Client({
  //credentials: fromIni({ profile: 'atelier' }),
  credentials: fromEnv(),
  region: process.env.AWS_BUCKET_REGION || `us-west-2`,
});

const upload = async (data, fileName, contentType, bucket) => {
  const params = {
    Bucket: bucket,
    Key: fileName,
    //   ContentType: contentType,
    Body: data,
    //   ACL: 'public-read',
  };

  const command = new PutObjectCommand(params);
  return client.send(command);
};

const get = async (key, bucket) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  return client.send(command);
};

module.exports = {
  upload,
  get,
};
