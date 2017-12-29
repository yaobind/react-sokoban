/**
 * Created by armanddu on 31/01/17.
 */

import React from 'react'

export class Box extends React.Component {
	static propTypes = {
		box: React.PropTypes.shape({
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired
		}).isRequired,
		step: React.PropTypes.number.isRequired
	};

	static defaultStyles = {
		border:'1px solid gray',
		backgroundColor: 'brown',
		position:'absolute',
		display: 'inline-box',
		padding: 'auto'
	};

	render() {
		const { box, step } = this.props;
		const style = {
			...Box.defaultStyles,
			top: box.y * step || 0,
			left: box.x * step || 0,
			width: `${step}px`,
			height: `${step}px`,
			backgroundColor: box.active ? 'green' : 'brown'
		};
		return (
			<div style={style}></div>
		)
	}
}

export default Box;
