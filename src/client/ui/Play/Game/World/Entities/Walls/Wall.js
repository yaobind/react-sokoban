/**
 * Created by armanddu on 31/01/17.
 */

import React from 'react'
import PropTypes from 'prop-types'

import './Wall.css'

export class Wall extends React.Component {
    static propTypes = {
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }).isRequired,
        step: PropTypes.number.isRequired
    };

    render() {
        const { position, step } = this.props;
        const style = {
            top: position.y * step || 0,
            left: position.x * step || 0,
            width: `${step}px`,
            height: `${step}px`
        };
        return (
            <div className={"Wall"} style={style}/>
        )
    }
}

export default Wall;
