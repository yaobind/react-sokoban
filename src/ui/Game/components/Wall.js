/**
 * Created by armanddu on 31/01/17.
 */

import React from 'react'

export class Wall extends React.Component {
	static propTypes = {
		position: React.PropTypes.shape({
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired
		}).isRequired,
		step: React.PropTypes.number.isRequired
	};

	static defaultStyles = {
		border:'1px solid gray',
		backgroundColor: 'lightgray',
		position:'absolute',
		display: 'inline-box',
		padding: 'auto'
	};

	render() {
		const { position, step } = this.props;
		const style = {
			...Wall.defaultStyles,
			top: position.y * step || 0,
			left: position.x * step || 0,
			width: `${step}px`,
			height: `${step}px`
		};
		return (
			<div style={style}></div>
		)
	}
}

export default Wall;
