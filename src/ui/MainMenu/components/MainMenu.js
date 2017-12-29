import React from 'react'
import { MenuItem } from '../../../common'

export class MainMenu extends React.Component {
	render() {
		return (
			<div>
				<div className="game-menu-menu">
					<MenuItem className="game-menu-item"
										to="play">Play</MenuItem>
					<MenuItem className="game-menu-item"
										to="settings">Settings</MenuItem>
					<MenuItem className="game-menu-item"
										to="about">About</MenuItem>
				</div>
			</div>
		)
	}
}

export default MainMenu;
