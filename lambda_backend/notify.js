var push = require('pushover-notifications');
var secrets = require('secrets');

module.exports = function(config, callback) {
  console.time("notify");

  var p = new push({
    token: secrets.pushover.token,
    user: secrets.pushover.user,
  });

  var msg = {
    message: 'Arielle made a new sharing',
    device: 'MacbookPro'
  };

  p.send(msg, function(err, result) {
    console.timeEnd("notify");
    callback(err, config);
  });
};
