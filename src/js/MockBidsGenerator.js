'use strict';

var BidsGenerator = (function () {
  var MILLIS_IN_DAY = 60 * 60 * 24 * 1000;
  var DAYS_VARIATION = 10;
  var TAG_POOL = ['foo', 'bar', 'foobar', 'baz', 'this', 'that'];

  function BidsGenerator() {
  }

  /**
   * Returns randomly generated bids
   *
   * @param n {Number} number of bids. Defaults to 5.
   * @returns {Array} randomly generated bids
   */
  BidsGenerator.prototype.generate = function (n) {
    var n = n || 5;
    var bids = [];

    for (var i = 1; i <= n; i++) {
      var randomBid = {
        id: i,
        datetimes: {
          updated: getRandomDate(),
          'last executed': getRandomDate()
        },
        tags: [getRandomTag(), getRandomTag()] // two tags per bid
      };

      bids.push(randomBid);
    }

    return bids;
  };

  function getRandomDate() {
    var randomOffSet = Math.random() * MILLIS_IN_DAY  * DAYS_VARIATION;
    return new Date(new Date().getTime() - randomOffSet).toISOString();
  }

  function getRandomTag() {
    return TAG_POOL[Math.floor(Math.random() * TAG_POOL.length)];
  }

  return BidsGenerator;
})();