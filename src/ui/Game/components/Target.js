import React from 'react'

export class Target extends React.Component {
	static propTypes = {
		position: React.PropTypes.shape({
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired
		}).isRequired,
		step: React.PropTypes.number.isRequired
	};

	static defaultStyles = {
		border:'1px dashed gray',
		// borderRadius:'100%',
		// backgroundColor: 'green',
		position:'absolute',
		display: 'inline-box',
		padding: 'auto'
	};

	render() {
		const { position, step } = this.props;
		const style = {
			...Target.defaultStyles,
			top: position.y * step || 0,
			left: position.x * step || 0,
			width: `${step}px`,
			height: `${step}px`
		};
		return (
			<div style={style}>
				<i style={{width:`${step/5}px`,backgroundColor:'green'}} />
			</div>
		)
	}
}

export default Target;
