import React from 'react'
import PropTypes from 'prop-types'

import './World.css'

export class World extends React.Component {

    static propTypes = {

        level: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            entities: PropTypes.array.isRequired
        }).isRequired,

        renderEntity: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,

        chunkSize: PropTypes.number.isRequired
    };

    isInBoundaries = (width, height) => (e) => {
        return e.x >= 0 && e.x < width && e.y >= 0 && e.y < height;
    };

    render() {
        const { chunkSize: step } = this.props;
        const { level } = this.props;
        const { renderEntity } = this.props;
        const style = {
            width: step * level.width,
            height: step * level.height,
            backgroundSize: `${step}px`,
            margin: `${step}px auto`
        };

        return (
            <div className={"world-container"}>
                <div>
                    <h4>{level.name}</h4>
                    <p>{level.description}</p>
                </div>
                <div className={"World"} style={style}>
                    {level.entities
                        .filter(this.isInBoundaries(level.width, level.height))
                        .map((e) => renderEntity(e, step))}
                </div>
            </div>
        )
    }
}

export default World;