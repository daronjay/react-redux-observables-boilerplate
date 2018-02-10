/**
 * @module Reducers/Github
 * @desc Github Reducer
 */
import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';
import { parseError } from 'modules/client';
import { ActionTypes } from 'constants/index';

export const bookState = {
  orders: {
    data: { bids: {}, asks: {} , channel:0},
    message: '',
    status: 'idle',
  },
};

export default {
  book: createReducer(bookState, {
    [ActionTypes.FETCH_BOOK_REQUEST](state, { payload }) {
      return immutable(state, {
        orders: {
          status: { $set: 'loading' },
        },
      });
    },
    [ActionTypes.FETCH_BOOK_SUCCESS](state, { msg }) {
      if (msg.event) return state;
      if (msg[1] === 'hb') return state;
      const orders = state.orders.data;
      // if(state.orders.data.channel !== 0 && msg[0] !== state.orders.data.channel){
      //   orders = { bids: {}, asks: {} , channel: 0 };
      // }

      if (msg[1].length > 3) {
        console.log('Inside:', msg[1]);

        msg[1].forEach(ord => {
          const order = { price: ord[0], count: ord[1], amount: ord[2] };
          const side = order.amount >= 0 ? 'bids' : 'asks';
          order.amount = Math.abs(order.amount);
          orders[side][order.price] = order;
        });
        // console.log(orders);

        return immutable(state, {
          orders: {
            data: { $set: orders },
            status: { $set: 'loaded' },
            channel: { $set: msg[0] },
          },
        });
      }
      const ord = msg[1];
      const order = { price: ord[0], count: ord[1], amount: ord[2] };

      if (!order.count) {
        if (order.amount > 0) {
          if (orders.bids[order.price]) {
            delete orders.bids[order.price];
          }
        } else if (order.amount < 0) {
          if (orders.asks[order.price]) {
            delete orders.asks[order.price];
          }
        }
      } else {
        let side = order.amount >= 0 ? 'bids' : 'asks';
        order.amount = Math.abs(order.amount);
        orders[side][order.price] = order;
      }
      return { orders: {
        data: orders,
        status: 'loaded',
      } };
    },
    [ActionTypes.FETCH_BOOK_CANCEL](state, { payload }) {
      return immutable(state, {
        orders: {
          status: { $set: 'cancelled' },
        },
      });
    },
    [ActionTypes.FETCH_BOOK_FAILURE](state, { payload }) {
      return immutable(state, {
        orders: {
          message: { $set: parseError(payload.message) },
          status: { $set: 'error' },
        },
      });
    },
  }),
};
