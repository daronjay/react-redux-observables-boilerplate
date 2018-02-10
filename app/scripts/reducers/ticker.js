/**
 * @module Reducers/Github
 * @desc Github Reducer
 */
import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';
import { parseError } from 'modules/client';
import { ActionTypes } from 'constants/index';

export const tickerState = {
  pairs: {
    data: [],
    message: '',
    status: 'idle',
  },
};

export default {
  ticker: createReducer(tickerState, {
    [ActionTypes.FETCH_TICKER_REQUEST](state, { payload }) {
      return immutable(state, {
        pairs: {
          status: { $set: 'loading' },
        },
      });
    },
    [ActionTypes.FETCH_TICKER_SUCCESS](state, { payload }) {
      return immutable(state, {
        pairs: {
          data: { $set: payload.tickers },
          status: { $set: 'loaded' },
        },
      });
    },
    [ActionTypes.FETCH_TICKER_FAILURE](state, { payload }) {
      return immutable(state, {
        pairs: {
          message: { $set: parseError(payload.message) },
          status: { $set: 'error' },
        },
      });
    },
  }),
};
