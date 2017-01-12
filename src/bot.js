var
  twit = require('twit'),
  config = require('./config'),
  ura = require('unique-random-array'),
  strings = require('./helpers/strings');


var T = new twit(config);
var qs = ura(strings.queryString);
var rt = ura(strings.resultType);

var retweetFrequency = .1;
var favoriteFrequency = .1;

console.log('GO BOT GO!');


// ====================================
//    RETWEET 
// ====================================
var retweet = function() {
  var paramQs = qs();
  var paramRt = rt();
  var params = {
    q: paramQs,
    result_type: paramRt,
    lang: 'en'
  };
  T.get('search/tweets', params, function(err, data) {
    if (!err) {
      // grab id of tweet
      var retweetId = data.statuses[0].id_str;
      // retweet yo!
      T.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response) {
        // if err
        if (err) {
          console.log('DERP ON RETWEET!');
        }
        else {
          console.log('RETWEET SUCCESS!');
        }
      });
    }
    else {
      return console.log('CANNOT RETWEET! Derp!' + err);
    }
    var randomUser = randIdx(data.statuses).user.screen_name;
    console.log(randomUser + ' ' + paramQs + ' ' + paramRt);
  });
};

// retweet on bot start
retweet();
// retweet in every x minutes
setInterval(retweet, 60000 * retweetFrequency);

// REPLY 'Phrasing?' to certain query strings 

// ====================================
//    FAVORITE
// ====================================
var favorite = function() {
  var paramQs = qs();
  var paramRt = rt();
  var params = {
    q: paramQs,
    result_type: paramRt,
    lang: 'en'
  };
  T.get('search/tweets', params, function(err, data) {
    if (!err) {

      // find tweets randomly
      var tweet = data.statuses;
      var randomTweet = randIdx(tweet); // pick a random tweet

      // if tweet is found
      if (typeof randomTweet != 'undefined') {
        // Tell Twitter to 'favorite' it
        T.post('favorites/create', {
          id: randomTweet.id_str
        }, function(err, response) {
          // if error while 'favorite'
          if (err) {
            console.log('CANNOT BE FAVORITE! ERROR! Err: ' + err);
          }
          else {
            console.log('FAVORITED! SUCCESS!');
          }
        });
      }
      else {
        return console.log('CANNOT RETWEET! Derp!' + err);
      }
      var randomUser = randIdx(data.statuses).user.screen_name;
      console.log(randomUser + ' ' + paramQs + ' ' + paramRt);
    }
  });
};


// retweet on bot start
favorite();
// retweet in every x minutes
setInterval(favorite, 60000 * favoriteFrequency);


// Random index

function randIdx(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
