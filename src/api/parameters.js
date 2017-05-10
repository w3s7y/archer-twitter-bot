const config = require('../config').twitterConfig

module.exports = {
  q: config.queryString,
  result_type: config.resultType,
  lang: config.language
}