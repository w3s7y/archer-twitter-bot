const config = require('../config')
const params = require('./parameters')
const rando = require('../helpers/quotes')
const Twit = require('twit')

const bot = new Twit(config.twitterKeys)

const like = () => {
  bot.get('search/tweets',
    params, (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data.statuses)
        // data.statuses.forEach(function (s) {
        //   console.log(s.text)
        //   console.log(s.user.screen_name)
        //   console.log('\n')
      }
    })
}

module.exports = like
