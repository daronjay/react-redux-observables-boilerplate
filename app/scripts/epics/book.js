
import { ActionTypes } from 'constants/index';
import { webSocket } from 'rxjs/observable/dom/webSocket';
import { timer } from 'rxjs/observable/timer';
import { fromEvent } from 'rxjs/observable/fromEvent';

//Lazy, doesn't connect when no one is subscribed
const socket = webSocket('wss://api.bitfinex.com/ws/2');


export const fetchBook = (action$, store) =>
  action$.ofType(ActionTypes.FETCH_BOOK_REQUEST)
    .mergeMap(action =>
    {
      return socket.multiplex(
        () => JSON.stringify(action.book),
        () => JSON.stringify(action.book),
        msg => true//console.log('message received: ' + JSON.stringify(msg)),
      ).takeUntil(
        action$.ofType(ActionTypes.FETCH_BOOK_CANCEL)
      ).map(msg => ({ type: ActionTypes.FETCH_BOOK_SUCCESS, msg }));
    });

