import { combineReducers } from 'redux';

import cats from './cats';
import logs from './logs';

const reducers = combineReducers({ logs, cats });

export default reducers;