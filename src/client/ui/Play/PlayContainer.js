import React from 'react'
import {Route, withRouter} from "react-router-dom";
import {compose} from "recompose";

import LevelList from "./LevelList/LevelList";
import LoadLevel from "./LoadLevel/LoadLevel";
import PlayLevel from "./PlayLevel/PlayLevel";
import LevelProvider from "./LevelProvider/LevelProvider";

export class PlayContainer extends React.Component {

    nextPosition = (cur, vec, width, height) => {
        const nextX = cur.x + vec.x;
        const nextY = cur.y + vec.y;

        return {
            x: nextX >= 0 ? (nextX < width -1 ? nextX : width - 1) : 0,
            y: nextY >= 0 ? (nextY < height -1 ? nextY : height -1) : 0
        }
    };

    canMove = (position, entities) => {
        return !entities.some(e => !e.through && e.x === position.x && e.y === position.y);
    };

    updatePlayers = (entities, target, direction, vector, level) => {
        return entities.map(entity => {
            if (entity.player && entity.name === target.name) {
                const curPos = {x: entity.x, y: entity.y};
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
                const curPos = {x: player.x, y: player.y};
                const boxPos = {x: entity.x, y: entity.y };
                const nextPos = this.nextPosition(curPos, vector, level.width, level.height);
                const nextBoxPos = this.nextPosition(nextPos, vector, level.width, level.height);

                if (boxPos.x === nextPos.x && boxPos.y === nextPos.y) {
                    return {
                        ...entity,
                        ...(this.canMove(nextBoxPos, entities) ? nextBoxPos: boxPos )
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

    onMove = (direction) => (level, update)  => player => {
        const vectors = {
            north: {x: 0, y: -1},
            south: {x: 0, y: 1},
            west: {x: -1, y: 0},
            east: {x: 1, y: 0},

        };
        const vector = vectors[direction];
        if (vector) {
            compose(
                update,
                this.updateTriggerEntities,
                (e) => this.updatePlayers(e, player, direction, vector, level),
                (e) => this.updatePushEntities(e, player, vector, level))(level.entities)
        }
    };

    hasWon = (entities) => {
        return entities
            .filter(e => e.trigger)
            .every(e => entities.filter(b => b.push).some(b => b.x === e.x && b.y === e.y))
    };

    render() {
        const { match } = this.props;

        const mapControls = {
            up: this.onMove("north"),
            down: this.onMove("south"),
            left: this.onMove("west"),
            right: this.onMove("east"),
        };
        const getWin = (id) => {
            const won = JSON.parse(localStorage.getItem("ad:rs:won")) || {};
            return !!won[id];
        };
        const setWin = (id, win) => {
            const won = JSON.parse(localStorage.getItem("ad:rs:won")) || {};
            localStorage.setItem("ad:rs:won", JSON.stringify({...won, [id]: win}))
        };

        return (
            <LevelProvider categories={["intro", "original"]}>
                {/*give the data explicitly*/}
                {(levels, loaded) => (
                    !loaded ?
                        <div><h2>Loading</h2></div>
                        :
                        <div>
                            <Route path={`${match.url}/:id`} render={({match: {params}, history}) => (
                                <LoadLevel goBack={history.goBack} level={levels.find(l => l.id === params.id)}>
                                    {(level, update, initialState) => {
                                        const controls = {
                                            up: mapControls.up(level, update),
                                            down: mapControls.down(level, update),
                                            left: mapControls.left(level, update),
                                            right: mapControls.right(level, update),
                                            reset: () => update(initialState.entities),
                                            menu: () => history.push("/play")
                                        };
                                        if (this.hasWon(level.entities)) {
                                            setWin(level.id, true);
                                        }

                                        return (
                                            <PlayLevel
                                                win={this.hasWon(level.entities)}
                                                level={level}
                                                controls={controls}/>
                                        )
                                    }}
                                </LoadLevel>
                            )}/>
                            <Route exact path={match.url} render={(props) => <LevelList {...props} levels={levels} hasWon={getWin}/>} />
                        </div>
                )}
            </LevelProvider>
        )
    }
}

export default compose(withRouter)(PlayContainer);