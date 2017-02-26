'use strict';

/**
 * Main class that allows querying for Bids.
 *
 * Example usage:
 *    var q = new BidsQuery(bids); // pass in your own bids or use BidsGenerator class
 *    q.getBidsByLastUpdated(5, 'foot'); // filters
 *
 */
var BidsQuery = (function () {

  function BidsQuery(bids) {
    if (!Array.isArray(bids)) {
      throw new Error('Constructor expects bids array as an input. Received type ' + typeof bids + '.');
    }

    this.bids = bids;
  }

  /**
   * Returns bids sorted by last updated date.
   *
   * @param firstN {number} Number of bids to return
   * @param filterTag {string} Name of the tag to filter
   * @returns {Array} Sorted bids
   */
  BidsQuery.prototype.getBidsByLastUpdated = function (firstN, filterTag) {
    return getFirstNBids.call(this, 'updated', firstN, filterTag);
  };

  /**
   * Returns bids sorted by last executed date.
   *
   * @param firstN {number} Number of bids to return
   * @param filterTag {string} Name of the tag to filter
   * @returns {Array} Sorted bids
   */
  BidsQuery.prototype.getBidsByLastExecuted = function (firstN, filterTag) {
    return getFirstNBids.call(this, 'last executed', firstN, filterTag);
  };

  /**
   * Private method that returns processed bids.
   *
   * @param sortAttr {string} attribute used for sorting
   * @param firstN {number} Number of bids to return
   * @param filterTag {string} Name of the tag to filter
   * @returns {Array} Sorted bids
   */
  function getFirstNBids(sortAttr, firstN, filterTag) {
    var filteredBids, bids;

    filteredBids = getFilteredBids(this.bids, filterTag);
    bids = getSortedBids(filteredBids, sortAttr);
    return bids.slice(0, firstN).reverse();
  }

  /**
   * Returns filtered tags based on input filter name.
   *
   * @param bids {Array} array of bids
   * @param filterTag {string} Name of the tag to filter
   * @returns {Array} filtered bids
   */
  function getFilteredBids(bids, filterTag) {
    if (!filterTag) {
      return bids;
    } else if (typeof filterTag !== 'string') {
      throw new Error('Filter tag parameter needs to be of type String. Received ' + typeof filterTag + '.');
    }

    var filteredBids = bids.filter(function (bid) {
      var hasFilter = false;
      bid.tags.forEach(function (tag) {
        if (tag === filterTag) {
          hasFilter = true;
          return;
        }
      });

      return hasFilter;
    });

    return filteredBids;
  }

  /**
   * Private method that sorts the bids based on sorting attribute.
   *
   * @param bids {Array} bids to sort
   * @param sortAttr {string} attribute used for sorting
   * @returns {Array} sorted bids
   */
  function getSortedBids(bids, sortAttr) {
    // XXX: Following sort method implemented by browsers may not be stable.
    // To make this sorting more resilient, implement stable sort function such as merge sort.
    return bids.sort(function bidsSorter(a, b) {
      // descending order
      return Date.parse(b.datetimes[sortAttr]) - Date.parse(a.datetimes[sortAttr]);
    });
  }

  return BidsQuery;

})();
