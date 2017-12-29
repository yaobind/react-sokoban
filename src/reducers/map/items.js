/**
 * Created by armanddu on 01/02/17.
 */

import { MapActionType } from '../../actions/game'


const initialState = {};


export default (state = initialState, action) => {
	switch (action.type) {
		case MapActionType.LOAD_MAP_SUCCESS:
			console.log(action);
			return {
				...action.items || state
			};
		default: return state;
	}
};
