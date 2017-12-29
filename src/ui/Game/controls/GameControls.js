/**
 * Created by armanddu on 31/01/17.
 */

import React from 'react';
import keydown from 'react-keydown';
import { connect } from 'react-redux'
import { moveUp, moveLeft, moveDown, moveRight } from '../../../actions/player'

export class GameControls extends React.Component {

	static propTypes = {
		children: React.PropTypes.any.isRequired,
		style: React.PropTypes.object,
		className: React.PropTypes.string,

		moveUp: React.PropTypes.func.isRequired,
		moveDown: React.PropTypes.func.isRequired,
		moveLeft: React.PropTypes.func.isRequired,
		moveRight: React.PropTypes.func.isRequired
	};

	state = {
		keyHistory: []
	};

	defaultStyles = {
		border:'1px solid green',
		width:'auto',
		height:'99.8vh'
	};

	_addHistory(k) {
		this.setState({
			keyHistory: [
				...this.state.keyHistory,
				k
			].slice(-10)
		})
	}

	@keydown('esc', 'P')
	pause() {
		this._addHistory("pause");
		console.log("pause")
	};

	@keydown('up', 'Z')
	moveUp() {
		this._addHistory("move up");
		this.props.moveUp();
	};

	@keydown('down', 'S')
	moveDown() {
		this._addHistory("move down");
		this.props.moveDown();
	};


	@keydown('left', 'Q')
	moveLeft() {
		this._addHistory("move left");
		this.props.moveLeft();
	};

	@keydown('right', 'D')
	moveRight() {
		this._addHistory("move right");
		this.props.moveRight();
	};

	render() {
		const { children, style, className } = this.props;
		const stl = {
			...this.defaultStyles,
			...style
		};
		return (
			<div className={`${className}`} style={stl}>
				<div>{JSON.stringify(this.state)}</div>
				<div>{children}</div>
			</div>
		)
	}
}

const mapState = (state) => ({});

const mapDispatch  = {
	moveUp,
	moveLeft,
	moveDown,
	moveRight
};

export default connect(mapState, mapDispatch)(GameControls);
