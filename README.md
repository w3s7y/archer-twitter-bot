# Archer Twitter bot [@hi_archer_bot](https://twitter.com/hi_archer_bot)

[![Version][licence-badge]][licence-link]

I'm a big fan of Archer so decided to make a bot to retweet and like about all the things he loves and loathes:

- Archer
    * Of course he'll be tweeting about himself
- turtleneck
    * The 'tactleneck'
- Ocelot
- Burt Reynolds
- Kenny Loggins
- Do you not?
- alligators
- crocodiles

- Phrasing?
    * Responses to obvious 'Phrasing' questions

Todos:

- [x] LikeBot
- [ ] Responses to Phrasing
- [ ] Gif posting

`.env` file looks something like this:

```shell
TWITTER_CONSUMER_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_TOKEN_SECRET=...
TWITTER_TIMEOUT_MS=60*1000

SENTIMENT_KEY=...

QUERY_STRING=#ArcherFXX,Phrasing?,turtleneck,ocelot,"Burt Reynolds","Kenny Loggins",alligators,crocodiles
RESULT_TYPE=mixed
LANG=en

TWITTER_USERNAME=hi_archer_bot
TWITTER_RETWEET_RATE=10
TWITTER_LIKE_RATE=10
```


[licence-badge]: https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square
[licence-link]: http://opensource.org/licenses/MIT