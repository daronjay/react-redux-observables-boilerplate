/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import { fetchTicker } from './ticker';
import { fetchBook } from './book';

export default combineEpics(
  fetchTicker,
  fetchBook
);
