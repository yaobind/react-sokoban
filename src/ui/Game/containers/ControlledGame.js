/**
 * Created by armanddu on 31/01/17.
 */
import React from 'react'
import { connect } from 'react-redux'

import GameControls from '../controls'
import Game from '../components/Game'

export class ControlledGame extends React.Component {
	render() {
		return (
			<GameControls className="game-container">
				<Game step={64} {...this.props} />
			</GameControls>
		)
	}
}
const mapState = (state) => {
	const {content, dimensions, level, levelName} = state.map;
	return {
		content,
		dimensions,
		level,
		levelName
	};
};

export default connect(mapState)(ControlledGame);
