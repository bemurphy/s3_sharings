var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var bucket = new AWS.S3({params: {Bucket: 's3sharings'}});

module.exports = bucket;
