import React from 'react'
import { Route, withRouter } from "react-router-dom";
import { compose } from "recompose";

import LevelList from "./LevelList/LevelList";
import LoadLevel from "./LoadLevel/LoadLevel";
import PlayLevel from "./PlayLevel/PlayLevel";
import LevelProvider from "./LevelProvider/LevelProvider";
import TeamDirections from "./TeamDirections/TeamDirections";
import ModeSelector from "./ModeSelector/ModeSelector";
import Ranking from "./Ranking/Ranking";
import Home from "../Home/Home";

export class PlayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: props.ws,
            singleDirection: null,
            isTeamMode: false,
            localPlayer: null,
            myTeam: null,
            playermap: null,
            completed: null,
            rank: null,
        };

        this.onReceiveNewGame = this.onReceiveNewGame.bind(this);
        this.sendQuit = this.sendQuit.bind(this);
        this.onReceiveQuit = this.onReceiveQuit.bind(this);
        this.onSendTeamMode = this.onSendTeamMode.bind(this);
        this.onReceiveTeamMode = this.onReceiveTeamMode.bind(this);
        this.onReceiveRank = this.onReceiveRank.bind(this);
        this.setWin = this.setWin.bind(this);
        this.onReceiveComplete = this.onReceiveComplete.bind(this);
    }

    onSendMove = (direction) => (level, update) => player => {
        const { ws, isTeamMode, singleDirection, localPlayer, myTeam, completed } = this.state;
        if (completed) {
            return;
        }

        if (!localPlayer) {
            console.error("No local player, please refresh and input your name");
            return;
        }


        if (isTeamMode && singleDirection && direction !== singleDirection) {
            console.error(`${direction} is not allowed, you can only go ${singleDirection}!`);
            return;
        }
        if (!ws) {
            console.error("No WebSocket connection :(");
            return;
        }

        const msg = { type: 'MOVE', content: { direction, mover: localPlayer, team: myTeam} };
        ws.send(JSON.stringify(msg));
    };

    hasWon = (entities) => {
        return entities
            .filter(e => e.trigger)
            .every(e => entities.filter(b => b.push).some(b => b.x === e.x && b.y === e.y))
    };

    sendLevelPath = path => {
        const { ws } = this.props;
        if (ws) {
            ws.send(JSON.stringify({ type: 'NEW_GAME', content: `/play/${path}` }));
            console.log(`send transition to /play/${path} to server`);
        } else {
            console.error('ws not exist in playContainer, please refresh');
        }
    };

    onReceiveNewGame(path) {
        if (!this.state.localPlayer) {
            return;
        }
        const { history } = this.props;
        history.push(path);
        this.setState({ showGame: true, completed: false, rank: null });
    }

    sendQuit() {
        const { ws } = this.props;
        if (ws) {
            ws.send(JSON.stringify({ type: 'QUIT', content: '' }));
            console.log(`send quit to server`);
        } else {
            console.error('ws not exist in playContainer, please refresh');
        }
    }

    onReceiveQuit() {
        const { history } = this.props;
        const { ws } = this.props;
        history.push("/play");
        this.setState({ showGame: false, completed: false, rank: null, myTeam: null, isTeamMode: false, singleDirection: null });
        if (ws) {
            ws.send(JSON.stringify({ type: 'ALL_PLAYERS'}));
        } else {
            console.error('ws not exist in playContainer, please refresh');
        }
    }

    onSendTeamMode() {
        const modeAfterToggle = this.state.isTeamMode ? 'SOLO' : 'TEAM';
        const { ws } = this.props;
        if (ws) {
            ws.send(JSON.stringify({ type: 'MODE', content: { mode: modeAfterToggle } }));
            console.log(`send ${modeAfterToggle} to server`);
        } else {
            console.error('ws not exist in playContainer, please refresh');
        }
    }

    onReceiveTeamMode({ mode, playermap }) {
        if (mode) {
            this.setState({ isTeamMode: mode === 'TEAM', myTeam: null });
            console.log(`server: MODE toggles to ${mode}`);
        }

        if (playermap && playermap[this.state.localPlayer]) {
            const {team, dirlimit} = playermap[this.state.localPlayer];
            this.setState({myTeam: team, singleDirection: dirlimit, playermap});
        }
    }

    onReceiveRank(rank) {
        console.log('server: rank ' + rank);
        if (rank) {
            this.setState({rank});
        }
    }

    onReceiveComplete({player, team, time}) {
        const {completed, localPlayer} = this.state;

        if (completed) {
            return;
        }
        if (player === localPlayer) {
            this.setState({completed: true});
        }
    }

    componentDidMount() {
        const { ws } = this.props;
        if (ws) {
            ws.MSG_HANDLERS['NEW_GAME'] = this.onReceiveNewGame;
            ws.MSG_HANDLERS['QUIT'] = this.onReceiveQuit;
            ws.MSG_HANDLERS['MODE'] = this.onReceiveTeamMode;
            ws.MSG_HANDLERS['RANK'] = this.onReceiveRank;
            ws.MSG_HANDLERS['COMPLETE'] = this.onReceiveComplete;
        } else {
            console.error('ws not exist in playContainer, please refresh!');
        }
    }

    setWin = (id, win) => {
        const { ws, localPlayer, myTeam, completed } = this.state;
        const won = JSON.parse(localStorage.getItem("ad:rs:won")) || {};
        // localStorage.setItem("ad:rs:won", JSON.stringify({ ...won, [id]: win }));
        console.log('you win');
        if (completed) {
            return;
        }

        if (ws) {
            ws.send(JSON.stringify({ type: 'COMPLETE', content: { player: localPlayer, team:myTeam, time: Date.now() } }));
            console.log(`send COMPLETE to server`);
        } else {
            console.error('ws not exist in playContainer, please refresh');
        }
    };

    sendRestart(update, entities) {
        const { ws, localPlayer, myTeam, isTeamMode } = this.state;
        if (isTeamMode) {
            if (ws) {
                ws.send(JSON.stringify({ type: 'RESTART', content: myTeam }));
                console.log(`send RESTART to server`);
            } else {
                console.error('ws not exist in playContainer, please refresh');
            }
        } else {
            update(entities);
        }
    }

    render() {
        const { match } = this.props;
        const { ws, localPlayer, myTeam, completed } = this.state;

        const mapControls = {
            up: this.onSendMove("north"),
            down: this.onSendMove("south"),
            left: this.onSendMove("west"),
            right: this.onSendMove("east"),
        };

        const getWin = (id) => {
            const won = JSON.parse(localStorage.getItem("ad:rs:won")) || {};
            return !!won[id];
        };

        return (
            <div>
                <div className="PlayerName">{this.state.localPlayer}</div>
                {!this.state.showGame &&
                    <Home player={this.state.localPlayer}
                        ws={this.props.ws}
                        onShowGame={() => this.setState({ showGame: true })}
                        onSetPlayer={player => this.setState({ localPlayer: player })}
                    />
                }

                {this.state.localPlayer === 'yaobin' &&
                            <ModeSelector onToggle={() => this.onSendTeamMode()} isTeamMode={this.state.isTeamMode} />
                }

                {this.state.isTeamMode && <div className={'mode-indicator'}>Team Mode On: <strong>{this.state.myTeam}</strong></div>}

                {(this.state.showGame || this.state.localPlayer === 'yaobin') &&
                    <div>
                        <LevelProvider categories={["intro", "original"]}>
                            {/*give the data explicitly*/}
                            {(levels, loaded) => (
                                !loaded ?
                                    <div><h2>Loading</h2></div>
                                    :
                                    <div>
                                        <Route path={`${match.url}/:id`} render={({ match: { params }, history }) => (
                                            <LoadLevel goBack={history.goBack}
                                                level={levels.find(l => l.id === params.id)}
                                                ws={ws}
                                                localPlayer={this.state.localPlayer}
                                                isTeamMode={this.state.isTeamMode}
                                                myTeam={this.state.myTeam}
                                            >
                                                {(level, update, initialState) => {
                                                    const controls = {
                                                        up: mapControls.up(level, update),
                                                        down: mapControls.down(level, update),
                                                        left: mapControls.left(level, update),
                                                        right: mapControls.right(level, update),
                                                        reset: () => this.sendRestart(update, initialState.entities), 
                                                        menu: () => this.sendQuit(),
                                                    };
                                                    if (this.hasWon(level.entities)) {
                                                        this.setWin(level.id, true);
                                                    }
                                                    ws.MSG_HANDLERS['RESTART'] = content => content === myTeam && update(initialState.entities);

                                                    return (
                                                        <PlayLevel
                                                            win={this.hasWon(level.entities)}
                                                            level={level}
                                                            controls={controls}
                                                            isAdmin={this.state.localPlayer === 'yaobin'}
                                                            isTeamMode={this.state.isTeamMode}
                                                        />
                                                    )
                                                }}
                                            </LoadLevel>
                                        )} />
                                        <Route exact path={match.url}
                                            render={(props) => <LevelList {...props} levels={levels} hasWon={getWin} sendLevelPath={this.sendLevelPath} />}
                                        />
                                    </div>
                            )}
                        </LevelProvider>
                        {this.state.isTeamMode && this.state.playermap && 
                            <TeamDirections myTeam={this.state.myTeam} playermap={this.state.playermap} localPlayer={this.state.localPlayer}/>}
                        <Ranking rank={this.state.rank}/>    
                    </div>
                }
            </div>
        )
    }
}

export default compose(withRouter)(PlayContainer);