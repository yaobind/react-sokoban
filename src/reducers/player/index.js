/**
 * Created by armanddu on 31/01/17.
 */
import { combineReducers } from 'redux'

import position from './position'
import moving from './moving'
import orientation from './orientation'

export default combineReducers({
	position,
	orientation,
	moving
});
