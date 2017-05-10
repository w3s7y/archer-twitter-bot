const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const rando = require('../helpers/rando')
const quotes = require('../helpers/quotes')

const param = config.twitterConfig
let tweetQuote = unique(quotes.quote)

const bot = new Twit(config.twitterKeys)

const quote = () => {
  let quote = tweetQuote()
  bot.post('statuses/update', {
    status: quote
  }, function (err, data, response) {
    if (err) {
      console.log(err)
    } else {
      console.log(data.text + ' tweeted!')
    }
  })
}

module.exports = quote
