var async = require('async');
var User = require('user');
var readability = require('readability');
var saveItem = require('save_item');
var makeRecent = require('make_recent');
var makeFeed = require('make_feed');
var fillContent = require('fill_content');
var fillComment = require('fill_comment');
var pingHub = require('ping_hub');
var notify = require('notify');
var triggerStageTwo = require('trigger_stage_two');

// Fetch the summary and write it to s3
function stageOne(config, context) {
  async.waterfall([
    function(callback) { readability(config, callback); },
    fillContent,
    fillComment,
    saveItem,
    triggerStageTwo,
  ], function (err, result){
    if (err) return context.fail(err);
    context.done(null, result.itemContent);
  });
}

// Aggregate post-processing, run in a separate
// call so as to not make the client wait for heavy
// publishing steps
function stageTwo(config, context) {
  async.waterfall([
    function(callback) { makeRecent(config, callback); },
    makeFeed,
    pingHub,
    notify,
  ], function (err, result){
    if (err) return context.fail(err);
    context.done(null, result.itemContent);
  });
}

exports.handler = function(event, context) {
  var config, user;

  if (event.user) {
    console.log("Received event for user:", event.user);
  }

  if (event.Records) {
    user = User.find(event.Records[0].Sns.Message);
    config = { user: user };
    stageTwo(config, context);
  } else {
    user = User.find(event.user.CustomerId);

    config = {
      url: event.url,
      user: user,
      comment: event.comment
    };

    stageOne(config, context);
  }
};
