import React from 'react'
import PropTypes from 'prop-types'

import './Player.css'

export class Player extends React.Component {

    static propTypes = {
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }).isRequired,
        step: PropTypes.number.isRequired,
        direction: PropTypes.oneOf(["north", "east", "west", "south"]).isRequired
    };

    render() {
        const { position, direction, step } = this.props;
        const style = {
            top: position.y * step || 0,
            left: position.x * step || 0,
            width: `${step}px`,
            height: `${step}px`,
            fontSize: `${step/2.6}px`
        };
        const mapPos = {
            north : '<span class="head">( ^ )</span>',
            east : '<span class="head">(&nbsp;&nbsp;°)</span><span class="beak">></span>',
            south : '<span class="head">(°<span class="beak">v</span>°)</span>',
            west : '<span class="beak"><</span><span class="head">(°&nbsp;&nbsp;)</span>'
        };
        const mapLegs ={
            north : '^^',
            east : '^',
            south : '^^',
            west : '&nbsp;&nbsp;&nbsp;^'
        };
        return (
            <div className={"Player"} style={style}>
                <span dangerouslySetInnerHTML={{__html: mapPos[direction]}} />
                <br/>
                <span dangerouslySetInnerHTML={{__html: mapLegs[direction]}} />
            </div>
        )
    }
}

export default Player;