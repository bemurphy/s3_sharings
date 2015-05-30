var bucket = require('bucket');

var maxTime = new Date('Jan 01 2036 00:00:01').getTime();
var now = new Date().getTime();

module.exports = function(config, callback) {
  console.time("save_item");

  var itemKey = config.user.dir +'items/' + (maxTime - new Date().getTime()).toString() + '.json';

  delete config.itemContent.content;

  bucket.putObject({Key: itemKey, ContentType: 'application/json', Body: JSON.stringify(config.itemContent)}, function(err, data){
    console.timeEnd("save_item");
    callback(err, config);
  });
};
