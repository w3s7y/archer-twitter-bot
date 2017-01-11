// use with 

// var sentiment = require('./sentiment');

// // SENTIMENT DETECTION =================
//  const hashtagStream = Twitter.stream('statuses/filter', {
//     track: '#100DaysOfCode'
//  });
//  
//  hashtagStream.on('tweet', (tweet) => {
//  
//    //  Setup the http call
//    var httpCall = sentiment.init()
//  
//    // Don't do anything if it's the bot tweet
//    if (tweet.user.screen_name == '_100DaysOfCode') return;
//  
//    httpCall.send("txt=" + tweet.text).end(function (result) {
//  
//      var sentim = result.body.result.sentiment;
//      var confidence = parseFloat(result.body.result.confidence);
//  
//      // if sentiment is Negative and the confidence is above 75%
//      if (sentim == 'Negative' && confidence >= 75) {
//  
//        // get a random quote
//        var phrase = sentiment.randomQuote()
//        var screen_name = tweet.user.screen_name
//  
//        // tweet a random encouragement phrase
//        tweetNow('@' + screen_name + ' ' + phrase)
//  
//      }
//  
//    });
//   })


const unirest = require('unirest');
const fs = require("fs");

/*
  Get a new API key at https://market.mashape.com/vivekn/sentiment-3
*/


// Sentiment 3 Mashape API key
var apiKey = "QqtO3XbGhFmshEmKBxy58FqKLvG3p1rx61ijsnaHTstuRd3jp0"

var sentiment = {}

sentiment.init = function () {
  return unirest.post("https://community-sentiment.p.mashape.com/text/")
  .header("X-Mashape-Key", apiKey)
  .header("Content-Type", "application/x-www-form-urlencoded")
  .header("Accept", "application/json")
}


sentiment.randomQuote = function () {
  // Get content from file
 var contents = fs.readFileSync("quotes.json");

 // Define to JSON type
 var jsonContent = JSON.parse(contents);

 // Random number
 var randomIndex = Math.floor(Math.random() * jsonContent.quotes.length)

 return jsonContent.quotes[randomIndex]
}

module.exports = sentiment