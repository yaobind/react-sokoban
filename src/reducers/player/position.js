/**
 * Created by armanddu on 31/01/17.
 */

import { PlayerActionType as ActionType } from '../../actions/player'
import { MapActionType } from '../../actions/game'

const initialState = {
	x: 0,
	y: 0
};

const position = (state = initialState, action) => {
	switch (action.type) {
		case MapActionType.LOAD_MAP_SUCCESS:
					return {
						...state,
						x: action.player.x,
						y: action.player.y
					};
		case ActionType.SET_POSITION:
					return {
						...state,
						x: action.x,
						y: action.y
					};
		case ActionType.MOVE_UP:
			return {
				...state,
				y: state.y - action.step
			};
		case ActionType.MOVE_DOWN:
			return {
				...state,
				y: state.y + action.step
			};
		case ActionType.MOVE_RIGHT:
			return {
				...state,
				x: state.x + action.step
			};
		case ActionType.MOVE_LEFT:
			return {
				...state,
				x: state.x - action.step
			};
		default: return state;
	}
};

export default position;
