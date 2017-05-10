require('dotenv').config()

module.exports = {
  twitterKeys: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  twitterConfig: {
    queryString: process.env.QUERY_STRING,
    resultType: process.env.RESULT_TYPE,
    language: process.env.LANG,
    username: process.env.TWITTER_USERNAME,
    retweet: process.env.TWITTER_RETWEET_RATE,
    like: process.env.TWITTER_LIKE_RATE * 1000
  },
  sentiment_api_key: process.env.SENTIMENT_KEY,
}
