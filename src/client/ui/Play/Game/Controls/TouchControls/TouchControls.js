import React from "react"
import PropTypes from 'prop-types'
import ScrollLock from 'react-scrolllock'

import ReactTouchEvents from "react-touch-events"

/**
 * TouchControls
 *
 * controls players with a swipe.
 * warning: experimental Component. On render it will lock the body scroll and force scroll to the bottom of the page
 */


export class TouchControls extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        controls: PropTypes.shape({
            "up": PropTypes.func,
            "down": PropTypes.func,
            "left": PropTypes.func,
            "right": PropTypes.func,
            reset: PropTypes.func,
            menu: PropTypes.func
        }).isRequired,

        players: PropTypes.array.isRequired
    };

    handleControl = (direction, e) => {
        const { controls, players: [player1] } = this.props;
        const mapDirection = {
            top: controls.up,
            bottom: controls.down,
            left: controls.left,
            right: controls.right
        };

        e.preventDefault();
        e.stopPropagation();

        const control  = mapDirection[direction];
        if (control) {
            control(player1);
        }
    };

    render () {
        const { children } = this.props;
        window.scrollTo(0, window.innerHeight);

        return (
            <ReactTouchEvents onSwipe={ this.handleControl}>
                <div>
                    <ScrollLock />

                    {children}
                </div>
            </ReactTouchEvents>
        )

    }


}

export default TouchControls;