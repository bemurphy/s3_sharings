var Sharing = {};

Sharing.Create = function(data, callback) {
  // AWS.config.credentials.expired = true;

  var lambda = new AWS.Lambda({
    region: "us-east-1",
  });

  lambda.invoke({
    FunctionName: "xtTest",
    Payload: JSON.stringify(data)
  }, callback);
};

module.exports = Sharing;
