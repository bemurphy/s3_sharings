var Feed = require('feed');
var bucket = require('bucket');
var timestamp = require('internet-timestamp');

var formatDescription = function(item, user) {
  var content = '';

  if (item.comment) content += item.comment;

  content += '<p>' + item.excerpt + '</p>';
  if (item.image_src) {
    content += '<img src="' + item.image_src + '" />';
  }

  return content;
};

module.exports = function(config, callback) {
  console.time("make_feed");

  var link = "https://s3.amazonaws.com/s3sharings/" + config.user.dir + "feed.xml";
  var feed = new Feed({
    title: config.user.name + "'s Feed",
    link: link,
    feed: link,
    hub: 'https://pubsubhubbub.appspot.com',
    date: new Date()
  });

  config.recentItems.map(function(item){
    feed.addItem({
      author: [{ name: config.user.name }],
      title: item.title,
      description: formatDescription(item, config.user),
      link: item.url,
      date: new Date(item.created_at)
    });
  });

  bucket.putObject({Key: config.user.feed, ACL: 'public-read', ContentType: 'application/xml;charset=utf-8', Body: feed.render('atom-1.0')}, function(err, data){
    console.timeEnd("make_feed");
    callback(err, config);
  });
};
