/**
 * Created by armanddu on 31/01/17.
 */

import { PlayerActionType as ActionType } from '../../actions/player'

const initialState = false;

const moving = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.MOVE_UP:
		case ActionType.MOVE_DOWN:
		case ActionType.MOVE_RIGHT:
		case ActionType.MOVE_LEFT:
			return true;
		case ActionType.DONE_MOVING:
					return false;
		default: return state;
	}
};

export default moving;
