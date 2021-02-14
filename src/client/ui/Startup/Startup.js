import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";

import Play from '../Play'

import './Startup.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Header/Header";
import Home from "../Home/Home";
import About from "../About/About";
import Help from "../Help/Help";

// const check = () => {
//     const { ws } = this.state;
//     if (!ws || ws.readyState == WebSocket.CLOSED) {
//         this.connect(); //check if websocket instance is closed, if so call `connect` function.
//     }
// }

const getWsInstance = () => {
    // TODO: use wss with https to be secure, need to resolve the SSL certificate issue
    var ws = new WebSocket("ws://67.161.9.16:6969");
    // let that = this; // cache the this
    // var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
        console.log("connected websocket main component");

        //this.setState({ ws: ws });

        // that.timeout = 250; // reset timer to 250 on open of websocket connection 
        // clearTimeout(connectInterval); // clear Interval on on open of websocket connection

        //ws.send(JSON.stringify({ type: 'JOIN', content: 'Yaobin' }));
    };

    // websocket onclose event listener
    ws.onclose = e => {
        console.log(
            `Socket is closed. Please refresh`,
            e.reason
        );
        // console.log(
        //     `Socket is closed. Reconnect will be attempted in ${Math.min(
        //         10000 / 1000,
        //         (that.timeout + that.timeout) / 1000
        //     )} second.`,
        //     e.reason
        // );

        // that.timeout = that.timeout + that.timeout; //increment retry interval
        // connectInterval = setTimeout(check, Math.min(10000, that.timeout)); //call check function after timeout
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

    ws.MSG_HANDLERS = {};

    ws.onmessage = ({ data }) => {
        const {type, content} = JSON.parse(data);
        const msgHandler = ws.MSG_HANDLERS[type];
        if (msgHandler) {
            msgHandler(content);
        } else {
            console.error(`no handler for type ${type}`);
        }          
      }

    return ws;
}

//timeout = 250; // Initial timeout duration as a class variable



const Startup = () => {
    const ws = getWsInstance();

    return (
        <Router>
            <div className={"App"}>
                <div className={"container main"}>
                    <Route path={"/about"} component={About} />
                    <Route path={"/help"} component={Help} />
                    <Route path={"/play"} render={(props) => (<Play {...props} ws={ws} />)} />
                </div>
            </div>
        </Router>
    )
};

export default Startup;