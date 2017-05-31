var
  twit = require('twit'),
  ura = require('unique-random-array'),
  fs = require('fs'),
  config = require('./config'),
  strings = require('./helpers/strings'),
  responses = require('./helpers/responses'),
  phrasing = require('./helpers/phrasing');


var T = new twit(config);
var qs = ura(strings.queryString);
var rt = ura(strings.resultType);

var retweetFrequency = 5;
var favoriteFrequency = 5;
var tweetFrequency = 5;

console.log('GO BOT GO!');



// Random index === possibly move this to helper folder

function randIdx(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}


// ====================================
//    POST TWEET WITH MEDIA
// ====================================

// below this line to get gif fom giphy ====================================

var Giphy = require('giphy'),
  giphy = new Giphy('dc6zaTOxFJmzC'); // use Giphy public beta key

var giphySearchString = qs();
var giphyFile



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

  var request = require('request');
  request(giphyFile).pipe(fs.createWriteStream('./src/img/archer.gif'));
});



// giphy.search('pokemon').then(function(res) {
//     // Res contains gif data!
//     console.log(giphySearchString);
//     // giphyFile = res.data.image_original_url;
//     var resData = res.data;

//     console.log(JSON.stringify(res));

//     console.log(    Object.getOwnPropertyNames ( resData ));
//     console.log(Object.keys( res ));
//     console.log(resData.hasOwnProperty('original'));

//     // console.log(data[0].type);


//     // var request = require('request');
//     // request(giphyFile).pipe(fs.createWriteStream('./src/img/archer.gif'));
// });

// below this line to save the gif locally ====================================

//  USE REQUEST AND FS TO SAVE IMAGE

//     // var request = require('request');
//     // request(giphyFile).pipe(fs.createWriteStream('./src/img/archer.gif'));

// below this line to post the gif ====================================

// var b64content = fs.readFileSync('./src/img/archer.png', { encoding: 'base64' });

// // first we must post the media to Twitter
// T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//   // now we can assign alt text to the media, for use by screen readers and
//   // other text-based presentations and interpreters
//   var mediaIdStr = data.media_id_string;
//   var altText = "Small flowers in a planter on a sunny balcony, blossoming.";
//   var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

//   T.post('media/metadata/create', meta_params, function (err, data, response) {
//     if (!err) {
//       // now we can reference the media and post a tweet (media will attach to the tweet)
//       var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] };

//       T.post('statuses/update', params, function (err, data, response) {
//         console.log(data, 'YAY!');
//       });
//     }
//   });
// });
