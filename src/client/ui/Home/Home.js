import React from 'react'
import { Link } from "react-router-dom";
import DisplayLevel from "../Play/DisplayLevel/DisplayLevel";
import PlayerList from "./PlayerList";

import './Home.css'

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playerName: '' };

        this.onReceiveJoin = this.onReceiveJoin.bind(this);
        this.onReceiveAllPlayers = this.onReceiveAllPlayers.bind(this);
    }

    onJoin() {
        const { ws, onSetPlayer } = this.props;

        if (this.state.playerName && ws) {
            ws.send(JSON.stringify({ type: 'JOIN', content: this.state.playerName }));
            onSetPlayer(this.state.playerName);
        }
    }

    onReceiveJoin(joinName) {
        console.log(`server: ${joinName} joined the game!`);
    }

    onReceiveAllPlayers(playerNameList) {
        console.log(`server: ${playerNameList.length} players joined the game!`);
        this.setState({ playerNameList });
    }

    onReceiveLeave(leaveName) {
        console.log(`server: ${leaveName} left the game!`);
    }

    handleChange(event) {
        this.setState({ playerName: event.target.value });
    }

    componentDidMount() {
        const { ws } = this.props;
        if (ws) {
            ws.MSG_HANDLERS['JOIN'] = this.onReceiveJoin;
            ws.MSG_HANDLERS['LEAVE'] = this.onReceiveLeave;
            ws.MSG_HANDLERS['ALL_PLAYERS'] = this.onReceiveAllPlayers;
        } else {
            console.error('websocket not connected in Home, please refresh!');
        }
    }

    render() {
        const playLevel = {
            name: "Free Play",
            description: "choose any level",
            width: 8,
            height: 1,
            rules: [],
            entities: [
                { x: 2, y: 0, type: "player", direction: "east" },
                { x: 3, y: 0, type: "box" },
                { x: 5, y: 0, type: "target" },
            ]
        };
        const aboutLevel = {
            name: "About",
            description: "know more about this project",
            width: 8,
            height: 1,
            rules: [],
            entities: [
                { x: 0, y: 0, type: "wall" },
                { x: 1, y: 0, type: "wall" },
                { x: 2, y: 0, type: "box" },
                { x: 3, y: 0, type: "box" },
                { x: 4, y: 0, type: "box" },
                { x: 5, y: 0, type: "box" },
                { x: 6, y: 0, type: "wall" },
                { x: 7, y: 0, type: "wall" },
            ]
        };
        const helpLevel = {
            name: "Help",
            description: "learn how to play",
            width: 8,
            height: 1,
            rules: [],
            entities: [
                { x: 0, y: 0, type: "box" },
                { x: 2, y: 0, type: "player", direction: "east" },
                { x: 3, y: 0, type: "player", direction: "north" },
                { x: 4, y: 0, type: "player", direction: "south" },
                { x: 5, y: 0, type: "player", direction: "west" },
                { x: 7, y: 0, type: "box", },
            ]
        };

        const chunkSize = 38;
        const {player} = this.props;
        return (
            <div className={"Home"}>
                {!player &&
                    <div>
                        <div className={'BoxContainer'}>
                            <div className={'Box'}><strong>Multiplayer</strong> <strong>Sokoban</strong></div>
                            <div className={'Signature'}>by Yaobin Dong</div>
                        </div>
                        <input placeholder="your name" value={this.state.playerName} onChange={event => this.handleChange(event)} />
                        <button className={'JoinButton'} onClick={() => this.onJoin()}>Join</button>
                    </div>
                }

                {player &&
                    <div>Hi {player}, welcome to the game, waiting for admin to start the game...
                    <button className={"hidden"} onClick={() => this.props.onShowGame()}>Show Game Levels</button>
                    </div>
                }

                {player && this.state.playerNameList &&
                    <PlayerList players={this.state.playerNameList} />
                }
            </div>
        )
    }
}

export default Home;