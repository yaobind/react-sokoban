/**
 * Created by armanddu on 01/02/17.
 */
import { combineReducers } from 'redux'


export default combineReducers({
	title: () => "React Sokoban",
	loaded: () => true,
	paused: () => false,
	moves: () => 0
});
