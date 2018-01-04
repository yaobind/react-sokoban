import React from 'react'
import PropTypes from 'prop-types'

import './PadControls.css'

export class PadControls extends React.Component {

    static propTypes = {
        controls: PropTypes.shape({
            "up": PropTypes.func,
            "down": PropTypes.func,
            "left": PropTypes.func,
            "right": PropTypes.func,
            reset: PropTypes.func,
            menu: PropTypes.func,
        }).isRequired,

        player: PropTypes.object.isRequired
    };

    state = {
        hidden: true
    };

    toggleHidden = (hidden) => () => {
        this.setState({
            hidden
        })
    };

    render() {
        const { controls:map, player } = this.props;
        const { hidden } = this.state;

        return (
            <div className={"PadControls"}>
                <div >
                    PadControls <span onClick={this.toggleHidden(!hidden)}>({hidden ? "show" : "hide"})</span>
                </div>
                <div hidden={hidden}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <button disabled={!map.reset} onClick={map.reset}>Reset</button>
                            </td>
                            <td/>
                            <td>
                                <button disabled={!map.menu} onClick={map.menu}>Menu</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className={"arrow-controls"}>
                        <tbody>
                        <tr>
                            <td/>
                            <td><button disabled={!map.up} onClick={() => map.up(player)}>Up</button></td>
                            <td/>
                        </tr>
                        <tr>
                            <td><button disabled={!map.left} onClick={() => map.left(player)}>Left</button></td>
                            <td/>
                            <td><button disabled={!map.right} onClick={() => map.right(player)}>Right</button></td>
                        </tr>
                        <tr>
                            <td/>
                            <td><button disabled={!map.down} onClick={() => map.down(player)}>Down</button></td>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PadControls;