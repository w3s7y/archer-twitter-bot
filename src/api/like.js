const config = require('../config')
const rando = require('../helpers/rando')
const Twit = require('twit')
const unique = require('unique-random-array')
const param = require('../config').twitterConfig
const queryString = unique(param.queryString.split(','))
const bot = new Twit(config.twitterKeys)

const like = () => {
  let query = queryString()
  bot.get('search/tweets', {
    q: query,
    result_type: param.resultType,
    lang: param.language,
    filter: 'safe'
  }, (err, data, response) => {
    if (err) {
      console.log('ERRORDERP: Search: ', err)
    } else {
      let randoTweet = rando(data.statuses)
      if (typeof randoTweet != 'undefined') {
        bot.post('favorites/create', {
          id: randoTweet.id_str
        }, (err, data, response) => {
          if (err) {
            console.log('ERRORDERP: Post like: ', err)
          } else {
            console.log(data.text + ' tweet liked!')
          }
        })
      }
    }
  })
}

module.exports = like