/**
 * Created by armanddu on 31/01/17.
 */

import { PlayerActionType as ActionType } from '../../actions/player'

const initialState = "south";

const position = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.SET_POSITION:
			return "south";
		case ActionType.TURN_UP:
			return "north";
		case ActionType.TURN_DOWN:
			return "south";
		case ActionType.TURN_RIGHT:
			return "east";
		case ActionType.TURN_LEFT:
			return "west";
		default: return state;
	}
};

export default position;
