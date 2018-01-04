import React from 'react'
import PropTypes from 'prop-types'

import World from "../Game/World/World";
import Player from "../Game/World/Entities/Players/Player";
import Wall from "../Game/World/Entities/Walls/Wall";
import Error from "../Game/World/Entities/Errors/Error";
import Box from "../Game/World/Entities/Boxes/Box";
import Target from "../Game/World/Entities/Targets/Target";


export class DisplayLevel extends React.Component {

    static propTypes = {
        chunkSize: PropTypes.number,
        level: PropTypes.object.isRequired,
        win: PropTypes.bool
    };

    static defaultProps = {
        chunkSize: 48
    };

    entityRenderer = (e, chunkSize) => {

        const props = {
            key: `${e.x}-${e.y}-${e.type}`,
            position: {x: e.x, y: e.y},
            step: chunkSize
        };

        switch (e.type) {
            case 'player':
            case 'p':
                return <Player {...props} direction={e.direction || "south"}/>;
            case 'wall':
            case 'w':
                return <Wall {...props}/>;
            case 'box':
            case 'b':
                return <Box {...props}/>;
            case 'target':
            case 't':
                return <Target {...props} active={e.active}/>;
            default:
                return <Error {...props}/>;
        }
    };

    render() {

        const { level, chunkSize } = this.props;

        return (
            <div>
                <World
                    chunkSize={chunkSize}
                    level={level}
                    renderEntity={this.entityRenderer}/>
            </div>
        )
    }
}

export default DisplayLevel;