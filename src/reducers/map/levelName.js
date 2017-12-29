/**
 * Created by armanddu on 01/02/17.
 */

import { MapActionType } from '../../actions/game'


const initialState = "level -";

export default (state = initialState, action) => {
	switch (action.type) {
		case MapActionType.LOAD_MAP_SUCCESS:
			return action.levelName || state;
		default: return state;
	}
};
