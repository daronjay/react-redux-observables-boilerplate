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
export function fetchTicker(): Object {
  return {
    type: ActionTypes.FETCH_TICKER_REQUEST,
    ticker: {
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD'
    },
  };
}
