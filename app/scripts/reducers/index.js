/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import ticker from './ticker';
import book from './book';

export default {
  ...app,
  ...ticker,
  ...book,
};
