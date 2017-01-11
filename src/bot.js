var
  twit = require('twit'),
  config = require('./config'),
  ura = require('unique-random-array'),
  strings = require('./helpers/strings');


var T = new twit(config);
var qs = ura(strings.queryString);
var rt = ura(strings.resultType);

var retweetFrequency = .2;
var favoriteFrequency = 5;

console.log('GO BOT GO!');

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

// grab & retweet as soon as program is running...
retweet();
// retweet in every five minutes
setInterval(retweet, 60000 * retweetFrequency);

function randIdx(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// T.post('statuses/update', {
//   status: 'hello world!'
// }, function(err, data, response) {
//   console.log(data);
// });
