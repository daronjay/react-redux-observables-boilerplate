// @flow
/**
 * @module Actions/Github
 * @desc Actions for Github
 */

import { ActionTypes } from 'constants/index';

/**
 * fetchTicker
 *
 * @returns {Object}
 */
export function fetchBook(symbol): Object {
  return {
    type: ActionTypes.FETCH_BOOK_REQUEST,
    book: {
      event: 'subscribe',
      channel: 'book',
      symbol: symbol,
      prec: 'P1',
    },
  };
}

export function cancelBook(): Object {
  return {
    type: ActionTypes.FETCH_BOOK_CANCEL,
    book: {
      channel: 'book',
    },
  };
}
