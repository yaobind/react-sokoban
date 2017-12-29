/**
 * Created by armanddu on 31/01/17.
 */
import { combineReducers } from 'redux'
import player from './player'
import game from './game'
import map from './map'

export default combineReducers({
	game,
	player,
	map
})
