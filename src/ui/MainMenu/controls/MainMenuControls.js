/**
 * Created by armanddu on 31/01/17.
 */

import React from 'react';
import keydown from 'react-keydown';

export class MainMenuControls extends React.Component {

	static propTypes = {
		children: React.PropTypes.any.isRequired,
		style: React.PropTypes.object,
		className: React.PropTypes.string
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
			]
		})
	}

	@keydown('up', 'Z', 'left', 'Q')
	moveUp() {
		this._addHistory("prev item");
		console.log("prev item")
	};

	@keydown('down', 'S', 'right', 'D')
	moveDown() {
		this._addHistory("next item");
		console.log("next item")
	};

	componentWillReceiveProps( { keydown } ) {
		if ( keydown.event ) {
			this._addHistory(String.fromCharCode(keydown.event.which))
		}
	}

	render() {
		const { children, style, className } = this.props;
		const stl = {
			...this.defaultStyles,
			...style
		};
		return (
			<div className={`${className}`} style={stl}>
				<div><p>Controls: {JSON.stringify(this.state)}</p></div>
				<div>{children}</div>
			</div>
		)
	}
}

export default MainMenuControls;
