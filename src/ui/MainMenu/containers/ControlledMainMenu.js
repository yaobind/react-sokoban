/**
 * Created by armanddu on 31/01/17.
 */
import React from 'react'
import MainMenuControls from '../controls'
import MainMenu from '../components/MainMenu'

export class ControlledMainMenu extends React.Component {
	render() {
		return (
			<MainMenuControls className="game-menu-container">
				<MainMenu />
			</MainMenuControls>
		)
	}
}

export default ControlledMainMenu;
