var Twit = require('twit')
var ura = require('unique-random-array')
var fs = require('fs')
var config = require('./config')
var strings = require('./helpers/strings')
var responses = require('./helpers/responses')
var phrasing = require('./helpers/phrasing')


console.log(config.twitter)
var bot = new Twit(config.twitter);
var qs = ura(strings.queryString);
var rt = ura(strings.resultType);


var retweetFrequency = 5;
var favoriteFrequency = 5;
var tweetFrequency = 5;
var gifFrequency = 4;
var postGifFrequency = 5;


console.log('GO BOT GO!');


// ====================================
//    RETWEET 
// ====================================
var retweet = function () {
  var paramQs = qs();
  var paramRt = rt();
  var params = {
    q: paramQs,
    result_type: paramRt,
    lang: 'en'
  };
  bot.get('search/tweets', params, function (err, data) {
    if (!err) {
      // grab id of tweet
      var retweetId = data.statuses[0].id_str;
      // retweet yo!
      bot.post('statuses/retweet/:id', {
        id: retweetId
      }, function (err, response) {
        // if err
        if (err) {
          console.log('DERP ON RETWEET!');
        } else {
          console.log('RETWEET SUCCESS!');
        }
      });
    } else {
      return console.log('CANNOT RETWEET! Derp!', err);
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
var favorite = function () {
  var paramQs = qs();
  var paramRt = rt();
  var params = {
    q: paramQs,
    result_type: paramRt,
    lang: 'en'
  };
  bot.get('search/tweets', params, function (err, data) {
    if (!err) {

      // find tweets randomly
      var tweet = data.statuses;
      var randomTweet = randIdx(tweet); // pick a random tweet

      // if tweet is found
      if (typeof randomTweet != 'undefined') {
        // Tell Twitter to 'favorite' it
        bot.post('favorites/create', {
          id: randomTweet.id_str
        }, function (err, response) {
          // if error while 'favorite'
          if (err) {
            console.log('CANNOT BE FAVORITE! ERROR! Err: ' + err);
          } else {
            console.log('FAVORITED! SUCCESS!');
          }
        });
      } else {
        return console.log('CANNOT RETWEET! Derp!' + err);
      }
      var randomUser = randIdx(data.statuses).user.screen_name;
      console.log(randomUser + ' ' + paramQs + ' ' + paramRt);
    }
  });
};


// favorite on bot start
favorite();
// favorite in every x minutes
setInterval(favorite, 60000 * favoriteFrequency);


// ====================================
//    STREAM API
// ====================================
var userStream = bot.stream('user');

userStream.on('follow', followed);

function followed(event) {
  console.log('FOLLOW EVENT RUNNING');

  // get USER's twitter handler (screen name)
  var screenName = event.source.screen_name;

  // function that replies back to every USER who followed for the first time
  tweetNow('Thanks @' + screenName + ' you rock!');

}


function tweetNow(tweetTxt) {
  var tweet = {
    status: tweetTxt
  };
  bot.post('statuses/update', tweet, function (err, data, response) {
    if (err) {
      console.log('REPLY DERP! ERROR!', err);
    } else {
      console.log('REPLY SUCCESS!', tweetTxt);
    }
  });
}


// Random index === possibly move this to helper folder

function randIdx(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}


// ====================================
//    POST TWEET WITH MEDIA 
// ====================================

// below this line to get gif fom giphy ====================================

var randomGif = function () {
  var Giphy = require('giphy'),
    giphy = new Giphy('dc6zaTOxFJmzC'); // use Giphy public beta key

  var giphySearchString = qs();
  var giphyFile;

  // Search with options using callback
  giphy.search({
    q: giphySearchString,
    rating: 'g'
  }, function (err, res) {
    // Res contains gif data!
    // console.log(JSON.stringify(res));
    var resData = randIdx(res.data);
    // console.log(JSON.stringify(resData));
    // console.log(Object.getOwnPropertyNames(resData.images.original.url));
    // console.log(Object.keys(resData));
    console.log(resData.images.original.url);

    giphyFile = resData.images.original.url;
    // below this line to save the gif locally ====================================

    var request = require('request');
    request(giphyFile).pipe(fs.createWriteStream('./src/img/archer.gif'));
  });
};

// Send tweet immediately when app start
randomGif();
// Send tweet each x minutes
setInterval(randomGif, 60000 * gifFrequency);

// below this line to post the gif ====================================

var postGif = function () {
  var b64content = fs.readFileSync('./src/img/archer.gif', {
    encoding: 'base64'
  });

  // first we must post the media to Twitter 
  bot.post('media/upload', {
    media_data: b64content
  }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and 
    // other text-based presentations and interpreters 
    var mediaIdStr = data.media_id_string;
    var altText = "Small flowers in a planter on a sunny balcony, blossoming.";
    var meta_params = {
      media_id: mediaIdStr,
      alt_text: {
        text: altText
      }
    };

    bot.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet) 
        var params = {
          status: 'Random gif via Giphy!',
          media_ids: [mediaIdStr]
        };

        bot.post('statuses/update', params, function (err, data, response) {
          console.log(data, 'YAY!');
        });
      }
    });
  });
};


// Send tweet immediately when app start
postGif();
// Send tweet each x minutes
setInterval(postGif, 60000 * postGifFrequency);

// ====================================
//    SEND TWEET 
// ====================================

var ps = ura(phrasing.phrasingQueryString);
var pr = ura(phrasing.phrasingReplyString);

function sendTweet() {

  var paramQs = ps();
  var paramRt = rt();

  var params = {
    q: paramQs,
    result_type: paramRt,
    lang: 'en'
  };

  bot.get('search/tweets', params, function (err, data) {
    if (!err) {
      var phrasingReply = pr();
      var randomUser = randIdx(data.statuses).user.screen_name;
      tweetNow('@' + randomUser + ' ' + phrasingReply);
    }

  });
}

// Send tweet immediately when app start
sendTweet();
// Send tweet each x minutes
setInterval(sendTweet, 60000 * tweetFrequency);