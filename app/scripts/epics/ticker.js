
import { ActionTypes } from 'constants/index';

import { Observable } from 'rxjs/Observable';
import { webSocket } from 'rxjs/observable/dom/webSocket';
import { timer } from 'rxjs/observable/timer';
import { fromEvent } from 'rxjs/observable/fromEvent';

// Lazy, doesn't connect when no one is subscribed
// const socket = webSocket('wss://api.bitfinex.com/ws/2');
//
//
// export const fetchTicker = (action$, store) =>
//   action$.ofType(ActionTypes.FETCH_TICKER_REQUEST)
//     .mergeMap(action =>
//     {
//       return socket.multiplex(
//         () => JSON.stringify(action.ticker),
//         () => JSON.stringify(action.ticker),
//         msg => true//console.log('message received: ' + JSON.stringify(msg)),
//       ).map(tick => ({ type: ActionTypes.FETCH_TICKER_SUCCESS, payload: tick })
//       );
//     });

//headers : {
       // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    //}

export function fetchTicker(action$) {
  return action$.ofType(ActionTypes.FETCH_TICKER_REQUEST)
    .switchMap(() =>
      Observable.ajax({
          url: `https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tBTCEUR,tXRPUSD,tXRPBTC,tLTCUSD,tLTCBTC,tETHUSD,tETHBTC,tBCHUSD,tBCHBTC,tBCHETH`,
          crossDomain: true,
          createXHR: function () {
            return new XMLHttpRequest();
          }
        })
        .map(data => ({
          type: ActionTypes.FETCH_TICKER_SUCCESS,
          payload: { tickers: data.response },
        }))
        .takeUntil(action$.ofType(ActionTypes.CANCEL_FETCH))
        .defaultIfEmpty({ type: ActionTypes.FETCH_TICKER__CANCEL })
        .catch(error => [
          {
            type: ActionTypes.FETCH_TICKER_FAILURE,
            payload: { message: error.message, status: error.status },
            error: true,
          },
        ])
    );
}
