/**
 * Created by armanddu on 31/01/17.
 */

export const PlayerActionType = {

	SET_POSITION: 'PLAYER_SET_POSITION',

	MOVE_UP: 'PLAYER_MOVE_UP',
	MOVE_LEFT: 'PLAYER_MOVE_LEFT',
	MOVE_DOWN: 'PLAYER_MOVE_DOWN',
	MOVE_RIGHT: 'PLAYER_MOVE_RIGHT',

	TURN_UP: 'PLAYER_TURN_UP',
	TURN_LEFT: 'PLAYER_TURN_LEFT',
	TURN_DOWN: 'PLAYER_TURN_DOWN',
	TURN_RIGHT: 'PLAYER_TURN_RIGHT',

	MOVE_BOX: 'PLAYER_MOVE_BOX',
	MOVE_BOX_LEFT: 'PLAYER_MOVE_BOX_LEFT',
	MOVE_BOX_DOWN: 'PLAYER_MOVE_BOX_DOWN',
	MOVE_BOX_RIGHT: 'PLAYER_MOVE_BOX_RIGHT',

	DONE_MOVING: 'PLAYER_DONE_MOVING'
};

const step = 1;
const moveDelay = 1000 / 25;

const getNextPosition = (position, action) => {
	return {
		x: position.x + (action === PlayerActionType.MOVE_RIGHT ? step : (action === PlayerActionType.MOVE_LEFT ? -step : 0)),
		y: position.y + (action === PlayerActionType.MOVE_DOWN ? step : (action === PlayerActionType.MOVE_UP ? -step : 0))
	}
};

const insideArea = (nextPosition, { dimensions }) => {
	return !(nextPosition.y >= step * dimensions.height)
		&& !(nextPosition.x  >= step * dimensions.width)
		&& !(nextPosition.y < 0)
		&& !(nextPosition.x < 0);
};

const getSquare = ({x, y}, {content}) => {
	return content.filter(c => c.x === x && c.y === y)
};

const hasFreePath = (nextSquare, behindNextSquare) => {
	// console.log(nextSquare, behindNextSquare);
	if (!nextSquare.length || nextSquare.every(s => s.transparent)) return true;
	if (nextSquare.find(s => s.pushable)) return !(!behindNextSquare || behindNextSquare.some(s => !s.transparent));
	return false;
};

const canMove = ({ player, map }, nextPosition, square, squareBehind) => {
	return !player.moving
		&& insideArea(nextPosition, map)
		&& hasFreePath(square, squareBehind);

};

const doneMoving = () => ({type: PlayerActionType.DONE_MOVING});

const move = (type, step) => ({type, step});
const turn = (type) => {
	switch (type) {
		case PlayerActionType.MOVE_UP:
			return turnUp();
		case PlayerActionType.MOVE_LEFT:
			return turnLeft();
		case PlayerActionType.MOVE_DOWN:
			return turnDown();
		case PlayerActionType.MOVE_RIGHT:
			return turnRight()
	}
};

const _moveBox = (type, {x, y}, active) => {
	switch (type) {
		case PlayerActionType.MOVE_UP:
			return moveBox({x, y}, {x: x, y: y - 1}, active);
		case PlayerActionType.MOVE_LEFT:
			return moveBox({x, y}, {x: x - 1, y: y}, active);
		case PlayerActionType.MOVE_DOWN:
			return moveBox({x, y}, {x: x, y: y + 1}, active);
		case PlayerActionType.MOVE_RIGHT:
			return moveBox({x, y}, {x: x + 1, y: y}, active);
	}
};

const moveIfPossible = (type) => {
	return (dispatch, getState) => {
		const { player, map } = getState();
		const nextPosition = getNextPosition(player.position, type);
		const behindNextPosition = getNextPosition(nextPosition, type);
		const square = getSquare(nextPosition, map);
		const squareBehind = insideArea(behindNextPosition, map) && getSquare(behindNextPosition, map);

		if (!player.moving) dispatch(turn(type));
		if (canMove({player, map}, nextPosition, square, squareBehind)) {
			if (square.find(s => s.pushable))
				dispatch(_moveBox(type,
					square.find(s => s.pushable),
					squareBehind && squareBehind.find(s => s.target)));
			dispatch(move(type, step));
			setTimeout(() => {
				dispatch(doneMoving())
			}, moveDelay);
		}
		return Promise.resolve()
	}
};

export const setPlayerPosition = ({x, y}) => ({
	type: PlayerActionType.SET_POSITION,
	x,
	y
});

export const moveUp = () => moveIfPossible(PlayerActionType.MOVE_UP);
export const moveLeft = () => moveIfPossible(PlayerActionType.MOVE_LEFT);
export const moveDown = () => moveIfPossible(PlayerActionType.MOVE_DOWN);
export const moveRight = () => moveIfPossible(PlayerActionType.MOVE_RIGHT);

export const turnUp = () => ({type: PlayerActionType.TURN_UP});
export const turnLeft = () => ({type: PlayerActionType.TURN_LEFT});
export const turnDown = () => ({type: PlayerActionType.TURN_DOWN});
export const turnRight = () => ({type: PlayerActionType.TURN_RIGHT});

export const moveBox = (oldPosition, newPosition, active) => ({
	type: PlayerActionType.MOVE_BOX,
	oldPosition,
	newPosition,
	active
});
