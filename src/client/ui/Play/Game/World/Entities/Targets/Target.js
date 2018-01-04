/**
 * Created by armanddu on 31/01/17.
 */

import React from 'react'
import PropTypes from 'prop-types'

import './Target.css'

export class Target extends React.Component {
    static propTypes = {
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        active: PropTypes.bool,
        step: PropTypes.number.isRequired
    };

    render() {
        const { position, step, active } = this.props;
        const style = {
            top: position.y * step || 0,
            left: position.x * step || 0,
            width: `${step}px`,
            height: `${step}px`,
            borderColor: active ? "green" : "orange"
        };
        return (
            <div className={"Target"} style={style} />
        )
    }
}

export default Target;
