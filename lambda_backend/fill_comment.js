module.exports = function(config, callback) {
  if (!config.comment) return callback(null, config);

  var comment = '';
  comment += '<p class="comment" style="margin-bottom: 15px;"><strong>';
  comment += config.user.name + ' said: </strong>'+ config.comment +'</p>';

  config.itemContent.comment = comment;

  callback(null, config);
};
