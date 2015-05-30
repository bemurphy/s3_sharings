var async = require('async');
var request = require('request');

module.exports = function(config, callback) {
  console.time("ping_hub");

  var url = "https://s3.amazonaws.com/s3sharings/" + config.user.feed;

  async.parallel([
    function(cb){
      request.post('http://feedburner.google.com/fb/a/pingSubmit', {form: {bloglink: url}}, function(err, resp, body){
        cb(null, resp);
      });
    },
    function(cb){
      request.post('https://pubsubhubbub.appspot.com/publish', {form: {'hub.url': url, 'hub.mode': 'publish'}}, function(err, resp, body){
        cb(null, resp);
      });
    }
  ], function(err, results){
    console.timeEnd("ping_hub");
    callback(err, config);
  });
};
