// @flow
/**
 * @namespace Constants
 * @desc App constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes: Object = keyMirror({
  FETCH_TICKER_REQUEST: undefined,
  FETCH_TICKER_SUCCESS: undefined,
  FETCH_TICKER_FAILURE: undefined,
  FETCH_TICKER_CANCEL: undefined,
  FETCH_BOOK_REQUEST: undefined,
  FETCH_BOOK_SUCCESS: undefined,
  FETCH_BOOK_FAILURE: undefined,
  FETCH_BOOK_CANCEL: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
});

/**
 * @constant {Object} XHR
 * @memberof Constants
 */
export const XHR: Object = keyMirror({
  SUCCESS: undefined,
  FAIL: undefined,
});
