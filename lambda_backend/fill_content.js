var request = require('request');
var cheerio = require('cheerio');

module.exports = function(config, callback) {
  if (config.itemContent.image_src) return callback(null, config);

  console.time("fill_content");

  request.get(config.itemContent.url, function(err, response, body) {
    // If this fails, just keep trucking because we already have some data
    if (err) return callback(null, config);

    var $ = cheerio.load(body);

    config.itemContent.image_src = $('meta[property="og:image"]').attr('content') ||
      $('meta[property="og:image:url"]').attr('content') ||
      $('meta[itemprop="image"]').attr('content') ||
      $('meta[name="twitter:image:src"]').attr('content') ||
      $('img').first().attr('src');

    console.timeEnd("fill_content");
    callback(null, config);
  });
};
