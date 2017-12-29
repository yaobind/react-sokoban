import React from 'react'
import Player from '../containers/Player'
import Wall from './Wall'
import Box from './Box'
import Target from './Target'

export class Game extends React.Component {

	static propTypes = {
		step: React.PropTypes.number.isRequired,
		level: React.PropTypes.number.isRequired,
		levelName: React.PropTypes.string.isRequired,
		content: React.PropTypes.array.isRequired
	};

	renderContent = step => (item, i) => {
		if (item.kind === "box") return (<Box key={i} step={step} box={item}/>);
		if (item.kind === "target") return (<Target key={i} step={step} position={item}/>);
		if (item.kind === "wall") return (<Wall key={i} step={step} position={item}/>);

	};

	render() {
		const { step, content, dimensions, level, levelName } = this.props;
		const style = {
			width: `${ step * dimensions.width }px`,
			height: `${ step * dimensions.height }px`
		};
		return (
			<div>
				<h6>Level {level} - {levelName}</h6>
				<p>Dimensions: {`${JSON.stringify(dimensions)}`}</p>
				<div className="game-area" style={style}>
					{content.map(this.renderContent(step))}
					<Player step={step} />
				</div>
			</div>
		)
	}
}

export default Game;
