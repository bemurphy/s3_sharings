var secrets = require('secrets');

var User = {
  find: function(userId) {
    var user        = secrets.users[userId];
    user.id         = userId;
    user.CustomerId = userId;
    user.dir        = 'data/' + userId + '/';
    user.feed       = user.dir + 'feed.xml';

    return user;
  }
};

module.exports = User;
