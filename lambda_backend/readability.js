var secrets = require('secrets');
var readability = require('readability-api');

readability.configure({ parser_token: secrets.readabilityParserToken });

module.exports = function(config, callback) {
  console.time("readability");

  var parser = new readability.parser();

  parser.parse(config.url, function (err, parsed) {
    console.timeEnd("readability");
    config.itemContent = parsed;
    config.itemContent.created_at = new Date();
    callback(err, config);
  });
};

