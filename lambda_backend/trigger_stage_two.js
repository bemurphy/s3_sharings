var AWS = require('aws-sdk');
var sns = new AWS.SNS();

module.exports = function(config, callback) {
  console.time("trigger_stage_two");

  var params = {
    TopicArn: "arn:aws:sns:us-east-1:734188402028:s3sharings",
    Message: config.user.id
  };

  sns.publish(params, function(err, data) {
    console.timeEnd("trigger_stage_two");
    callback(err, config);
  });
};
