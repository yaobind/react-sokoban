import React from 'react'
import PropTypes from 'prop-types'

import './GameControls.css'

export class GameControls extends React.Component {

    static propTypes = {
        controls: PropTypes.shape({
            reset: PropTypes.func,
            menu: PropTypes.func,
        }).isRequired

    };

    render() {
        const { controls: map, isAdmin, isTeamMode } = this.props;

        return (
            <div className={"Game-controls"}>
                <div >
                    <ul>
                        <li><button disabled={!map.reset} onClick={map.reset}>Restart {isTeamMode && "all players in your team"}</button></li>
                        {isAdmin && <li><button disabled={!map.menu} onClick={map.menu}>Quit (Admin only)</button></li>}
                    </ul>
                </div>
            </div>
        )
    }
}

export default GameControls;