/**
 * Created by armanddu on 01/02/17.
 */

import { PlayerActionType as ActionType } from '../../actions/player'
import { MapActionType } from '../../actions/game'


const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case MapActionType.LOAD_MAP_SUCCESS:
			return action.content.map(c => ({
					...c,
					...action.items[c.kind]
				}));
		case ActionType.MOVE_BOX:
			const { oldPosition, newPosition } = action;
			const index = state
				.findIndex(b => b.pushable
				&& b.x === oldPosition.x
				&& b.y === oldPosition.y);
			return index < 0 ? state : [
				...state.slice(0, index),
				{
					...state[index],
					...newPosition,
					active: action.active
				},
				...state.slice(index+1)
			];
		default: return state;
	}
};
