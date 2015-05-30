var secrets = require('secrets');
var readability = require('readability-api');

readability.configure({ parser_token: secrets.readabilityParserToken });

module.exports = function(config, callback) {
  console.time("readability");

  var parser = new readability.parser();

  parser.parse(config.url, function (err, parsed) {
    var itemContent = {
      url: parsed.url,
      domain: parsed.domain,
      title: parsed.title,
      excerpt: parsed.excerpt,
      image_src: parsed.lead_image_url,
      created_at:  new Date(),
    };

    console.timeEnd("readability");
    config.itemContent = itemContent;
    callback(err, config);
  });
};

