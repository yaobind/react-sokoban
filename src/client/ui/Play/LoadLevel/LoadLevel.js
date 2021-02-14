import React from 'react'
import PropTypes from 'prop-types'
import { compose } from "recompose";
import * as _ from 'underscore'

/**
 * LoadLevel
 *
 * Component in charge of updating a level's entities and check they integrity
 *
 * @property level, the level to load and update
 * @property children: a renderProp. In charge of rendering the level.
 *
 */

export class LoadLevel extends React.Component {
    constructor(props) {
        super(props);

        this.onReceiveMove = this.onReceiveMove.bind(this);
    }

    static propTypes = {
        level: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            id: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            entities: PropTypes.array.isRequired
        }).isRequired,

        children: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
    };

    state = {};

    checkEntity = (rules) => entity => {
        return rules
            .filter(r => r.type === "entityCheck")
            .filter(r => r.target === entity.type)
            .reduce((acc, rule) => {
                return {
                    ...(rule.defaultProps || {}),
                    ...acc,
                    ...(rule.props || {})
                };
            }, entity);
    };

    updateLevel = (level, entities) => {
        const newEntities = entities || (level && level.entities);

        if (level && newEntities) {
            this.setState({
                level: {
                    ...level,
                    entities: _.sortBy(newEntities.map(this.checkEntity(level.rules)), (e) => e.trigger)
                }
            })
        }
    };

    componentWillMount() {
        const { level } = this.props;

        this.updateLevel(level);

    }

    componentDidMount() {
        const { ws } = this.props;
        if (ws) {
            ws.MSG_HANDLERS['MOVE'] = this.onReceiveMove;
        } else {
            console.error('websocket not connected, please refresh!');
        }
    }

    onReceiveMove = ({direction, mover, team}) => {
        const {isTeamMode, localPlayer, myTeam} = this.props
        if (!direction) {
            return;
        }

        if (!isTeamMode && mover && mover !== localPlayer) {
            return;
        }

        if (isTeamMode && team !== myTeam) {
            return;
        }

        console.log(direction + " in on receive move of loadLevel");

        const { level } = this.state;
        const player = level.entities.filter(e => e.type === "player")[0];
        const vectors = {
            north: { x: 0, y: -1 },
            south: { x: 0, y: 1 },
            west: { x: -1, y: 0 },
            east: { x: 1, y: 0 },
        };
        const vector = vectors[direction];
        if (vector) {
            compose(
                this.updateEntities,
                this.updateTriggerEntities,
                (e) => this.updatePlayers(e, player, direction, vector, level),
                (e) => this.updatePushEntities(e, player, vector, level))(level.entities)
        }
    };

    nextPosition = (cur, vec, width, height) => {
        const nextX = cur.x + vec.x;
        const nextY = cur.y + vec.y;

        return {
            x: nextX >= 0 ? (nextX < width - 1 ? nextX : width - 1) : 0,
            y: nextY >= 0 ? (nextY < height - 1 ? nextY : height - 1) : 0
        }
    }

    canMove = (position, entities) => {
        return !entities.some(e => !e.through && e.x === position.x && e.y === position.y);
    };

    updatePlayers = (entities, target, direction, vector, level) => {
        return entities.map(entity => {
            if (entity.player && entity.name === target.name) {
                const curPos = { x: entity.x, y: entity.y };
                const nextPos = this.nextPosition(curPos, vector, level.width, level.height);

                return {
                    ...entity,
                    direction,
                    ...(this.canMove(nextPos, entities) ? nextPos : curPos)

                }
            }
            return entity;
        });
    };

    updatePushEntities = (entities, player, vector, level) => {
        return entities.map(entity => {
            if (entity.push) {
                const curPos = { x: player.x, y: player.y };
                const boxPos = { x: entity.x, y: entity.y };
                const nextPos = this.nextPosition(curPos, vector, level.width, level.height);
                const nextBoxPos = this.nextPosition(nextPos, vector, level.width, level.height);

                if (boxPos.x === nextPos.x && boxPos.y === nextPos.y) {
                    return {
                        ...entity,
                        ...(this.canMove(nextBoxPos, entities) ? nextBoxPos : boxPos)
                    }
                }
            }
            return entity;
        });
    };

    updateTriggerEntities = (entities) => {
        return entities.map(entity => {
            if (entity.trigger) {
                return {
                    ...entity,
                    active: entities
                        .filter(e => e !== entity)
                        .some(e => e.x === entity.x && e.y === entity.y)
                }
            }
            return entity;
        });
    };

    updateEntities = (entities) => {
        const { level } = this.props;

        if (!entities || !Array.isArray(entities)) return;
        this.updateLevel(level, entities);
    };

    render() {
        const { children: renderProp, goBack, level: initialState } = this.props;
        let { level } = this.state;

        // if (!level && initialState) {
        //     level = initialState;
        // }

        if (!initialState && !level) {
            // goBack();
            return <div>Invalid: no initialState and level in loadLevel</div>;
        }
        return (
            <div>
                {renderProp(level, this.updateEntities, initialState)}
            </div>
        )
    }
}

export default LoadLevel;