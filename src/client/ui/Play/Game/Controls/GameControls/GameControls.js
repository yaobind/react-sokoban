import React from 'react'
import PropTypes from 'prop-types'

import './GameControls.css'

export class PadControls extends React.Component {

    static propTypes = {
        controls: PropTypes.shape({
            reset: PropTypes.func,
            menu: PropTypes.func,
        }).isRequired

    };

    render() {
        const { controls: map } = this.props;

        return (
            <div className={"Game-controls"}>
                <div className={"title"}>
                    Options
                </div>
                <div >
                    <ul>
                        <li><button disabled={!map.reset} onClick={map.reset}>restart</button></li>
                        <li><button disabled={!map.menu} onClick={map.menu}>Quit</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default PadControls;