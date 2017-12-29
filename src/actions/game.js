/**
 * Created by armanddu on 01/02/17.
 */

export const MapActionType = {
	LOAD_MAP_REQUEST: 'MAP_LOAD_MAP_REQUEST',
	LOAD_MAP_SUCCESS: 'MAP_LOAD_MAP_SUCCESS',
	LOAD_MAP_FAILURE: 'MAP_LOAD_MAP_FAILURE'

};

const mapLoading = () => ({
	type: MapActionType.LOAD_MAP_REQUEST
});

const mapFetched = (map) => ({
	type: MapActionType.LOAD_MAP_SUCCESS,
	...map
});

const mapFetchedError = (error) => ({
	type: MapActionType.LOAD_MAP_FAILURE
});

const maps = [
	{
		level: 1,
		levelName: "Crash Test level",
		dimensions: {width: 7, height: 7},
		items: {
			'wall': {
			},
			'box': {
				pushable: true
			},
			'target': {
				transparent: true,
				target: true
			}
		},
		content: [
				{kind: 'wall', x: 3, y: 2},
				{kind: 'wall', x: 3, y: 3},
				{kind: 'wall', x: 2, y: 3},
				{kind: 'wall', x: 1, y: 3},

				{kind: 'box', x: 1, y: 1},
				{kind: 'box', x: 2, y: 1},

				{kind: 'target', x: 3, y: 0},
				{kind: 'target', x: 3, y: 1}
			],
		player: {x: 0, y: 0}
	}
];

const fetchLevel = (level) => Promise.resolve(maps[level]);

export const loadMap = (level = 0) => {
	return (dispatch) => {
		dispatch(mapLoading());

		return fetchLevel(level)
			.then(map => {
				return dispatch(mapFetched(map));
			})
			.catch(error => {
				dispatch(mapFetchedError(error));
			})

	}
};
