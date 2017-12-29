/**
 * Created by armanddu on 31/01/17.
 */

import React from 'react'

export class Player extends React.Component {

	static propTypes = {
		position: React.PropTypes.shape({
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired
		}).isRequired,
		step: React.PropTypes.number.isRequired,
		orientation: React.PropTypes.oneOf(["north", "east", "west", "south"]).isRequired
	};

	static defaultStyles = {
		border:'1px dashed lightgray',
		// width: '38px',
		// height: '38px',
		// padding:'auto',
		// backgroundColor:'yellow',
		// borderRadius:'100%',
		position:'absolute',
		display: 'inline-box'
	};

	render() {
		const { position, orientation, step } = this.props;
		const style = {
			...Player.defaultStyles,
			top: position.y * step || 0,
			left: position.x * step || 0,
			width: `${step}px`,
			height: `${step}px`,
			fontSize: `${step/2.6}px`
		};
		const mapPos = {
			north : '<span style="background-color:yellow;border-radius:100%">( ^ )</span>',
			east : '<span style="background-color:yellow;border-radius:100%">(&nbsp;&nbsp;°)</span><span style="color:orange">></span>',
			south : '<span style="background-color:yellow;border-radius:100%">(°<span style="color:orange">v</span>°)</span>',
			west : '<span style="color:orange;"><</span><span style="background-color:yellow;border-radius:100%">(°&nbsp;&nbsp;)</span>'
		};
		const mapLegs ={
			north : '&nbsp;^^',
			east : '&nbsp;&nbsp;^',
			south : '&nbsp;^^',
			west : '&nbsp;&nbsp;&nbsp;&nbsp;^'
		};
		return (
			<div style={style}>
					<span dangerouslySetInnerHTML={{__html: mapPos[orientation]}} />
					<br/>
					<span dangerouslySetInnerHTML={{__html: mapLegs[orientation]}} />
			</div>
		)
	}
}

export default Player;
