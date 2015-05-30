var async = require('async');
var bucket = require('bucket');

function listRecent(userDir, callback) {
  bucket.listObjects({MaxKeys: 10, 'Prefix': userDir + 'items/'}, function(err, data) {
    callback(err, data);
  });
}

function makeGetFn(item) {
  return function(callback) {
    if (!item.Key.match(/\.json/)) return callback(null, null);

    bucket.getObject({Key: item.Key}, function(err, data){
      if (err) return callback(err, config);

      var obj = JSON.parse(data.Body.toString());
      delete(obj.content);
      callback(err, obj);
    });
  };
}

module.exports = function(config, callback) {
  console.time("make_recent");

  var userDir = config.user.dir;

  listRecent(userDir, function(err, data){
    if (err) return callback(err, config);

    var getFns = data.Contents.map(function(item){
      return makeGetFn(item);
    });

    async.parallel(getFns,function(err, results){
      results = results.filter(function(i){
        return i;
      });

      config.recentItems = results;

      bucket.putObject({Key: userDir + 'recent.json', ContentType: 'application/json', Body: JSON.stringify(results)}, function(err, data){
        console.timeEnd("make_recent");
        callback(err, config);
      });
    });
  });
};
