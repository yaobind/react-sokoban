import React from 'react'
import {Link} from "react-router-dom";
import DisplayLevel from "../Play/DisplayLevel/DisplayLevel";

import './Home.css'

export class Home extends React.Component {
    render() {
        const playLevel = {
            name: "Free Play",
            description: "choose any level",
            width: 8,
            height: 1,
            rules: [],
            entities: [
                {x: 2, y: 0, type: "player", direction: "east"},
                {x: 3, y: 0, type: "box"},
                {x: 5, y: 0, type: "target"},
            ]
        };
        const aboutLevel = {
            name: "About",
            description: "know more about this project",
            width: 8,
            height: 1,
            rules: [],
            entities: [
                {x: 0, y: 0, type: "wall"},
                {x: 1, y: 0, type: "wall"},
                {x: 2, y: 0, type: "box"},
                {x: 3, y: 0, type: "box"},
                {x: 4, y: 0, type: "box"},
                {x: 5, y: 0, type: "box"},
                {x: 6, y: 0, type: "wall"},
                {x: 7, y: 0, type: "wall"},
            ]
        };
        const helpLevel = {
            name: "Help",
            description: "learn how to play",
            width: 8,
            height: 1,
            rules: [],
            entities: [
                {x: 0, y: 0, type: "box"},
                {x: 2, y: 0, type: "player", direction: "east"},
                {x: 3, y: 0, type: "player", direction: "north"},
                {x: 4, y: 0, type: "player", direction: "south"},
                {x: 5, y: 0, type: "player", direction: "west"},
                {x: 7, y: 0, type: "box",},
            ]
        };

        const chunkSize = 38;
        return (
            <div className={"Home"}>
                <div>
                    <Link className={"menu-iem"} to={"/play"}>
                        <DisplayLevel level={playLevel} preview chunkSize={chunkSize}/>
                    </Link>
                </div>
                <div>
                    <Link className={"menu-iem"} to={"/about"}>
                        <DisplayLevel level={aboutLevel} preview chunkSize={chunkSize}/>
                    </Link>
                </div>
                <div>
                    <Link className={"menu-iem"} to={"/help"}>
                        <DisplayLevel level={helpLevel} preview chunkSize={chunkSize}/>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home;