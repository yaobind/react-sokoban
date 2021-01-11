import React from 'react'
import { Route, withRouter } from "react-router-dom";
import { compose } from "recompose";

import LevelList from "./LevelList/LevelList";
import LoadLevel from "./LoadLevel/LoadLevel";
import PlayLevel from "./PlayLevel/PlayLevel";
import LevelProvider from "./LevelProvider/LevelProvider";
import DirectionSelector from "./DirectionSelector/DirectionSelector";

export class PlayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            singleDirection: null,
        };
    }

    componentDidMount() {
        this.connect();
        // TODO: select direction menu should do this work
        // this.setState({ singleDirection: 'south' });
    }

    timeout = 250; // Initial timeout duration as a class variable

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = () => {
        var ws = new WebSocket("ws://67.161.9.16:6969");
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    }

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) {
            this.connect(); //check if websocket instance is closed, if so call `connect` function.
        }
    }

    onSendMove = (direction) => (level, update) => player => {
        const { ws, singleDirection } = this.state;
        if (singleDirection && direction !== singleDirection) {
            console.error(`${direction} is not allowed, you can only go ${singleDirection}!`);
            return;
        }
        if (!ws) {
            console.error("No WebSocket connection :(");
            return;
        }
        ws.send(direction);
    };

    hasWon = (entities) => {
        return entities
            .filter(e => e.trigger)
            .every(e => entities.filter(b => b.push).some(b => b.x === e.x && b.y === e.y))
    };

    render() {
        const { match } = this.props;
        const { ws } = this.state;

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
        const setWin = (id, win) => {
            const won = JSON.parse(localStorage.getItem("ad:rs:won")) || {};
            localStorage.setItem("ad:rs:won", JSON.stringify({ ...won, [id]: win }))
        };

        return (
            <div>
            <DirectionSelector onSelect={dir => this.setState({ singleDirection: dir })} />
            <LevelProvider categories={["intro", "original"]}>
                {/*give the data explicitly*/}
                {(levels, loaded) => (
                    !loaded ?
                        <div><h2>Loading</h2></div>
                        :
                        <div>
                            <Route path={`${match.url}/:id`} render={({ match: { params }, history }) => (
                                <LoadLevel goBack={history.goBack} level={levels.find(l => l.id === params.id)} ws={ws}>
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
                                                controls={controls} />
                                        )
                                    }}
                                </LoadLevel>
                            )} />
                            <Route exact path={match.url} render={(props) => <LevelList {...props} levels={levels} hasWon={getWin} />} />
                        </div>
                )}
            </LevelProvider>
            </div>
        )
    }
}

export default compose(withRouter)(PlayContainer);