/**
 * Created by armanddu on 01/02/17.
 */
import { combineReducers } from 'redux'

import content from './content'
import dimensions from './dimensions'
import items from './items'
import level from './level'
import levelName from './levelName'


export default combineReducers({
	content,
	dimensions,
	items,
	level,
	levelName
});
