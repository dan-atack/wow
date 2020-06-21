import { combineReducers } from 'redux';

import player from './playerReducer';
import game from './gameReducer';

export default combineReducers({ player, game });
