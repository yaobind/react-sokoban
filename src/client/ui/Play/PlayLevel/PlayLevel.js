import React from 'react'
import PropTypes from 'prop-types'
import DisplayLevel from "../DisplayLevel/DisplayLevel";

import './PlayLevel.css'
import {Link} from "react-router-dom";
import KeyboardControls from "../Game/Controls/KeyboardControls/KeyboardControls";
import GameControls from "../Game/Controls/GameControls/GameControls";
import TouchControls from "../Game/Controls/TouchControls/TouchControls";

export class PlayLevel extends React.Component {

    static propTypes ={
        level: PropTypes.object.isRequired,
        win: PropTypes.bool,
        controls: PropTypes.object.isRequired

    };

    baseSize = 600;

    getChunkSize = () => {
        const { level } = this.props;

        const baseSize = Math.min(this.baseSize, Math.min(window.innerWidth, window.innerHeight) - 10);
        return baseSize / Math.max(level.width, level.height);
    };

    renderWin = () => {
        const { win } = this.props;
        const chunkSize = this.getChunkSize();
        const style = {
            top: `${chunkSize}px`,
            // right: `-${chunkSize/2}px`,
        };

        if (!win) {
            return null;
        }

        return (
            <Link to={"/play"}>
                <div className={"level-complete"} style={style}>Level<br/>complete!</div>
            </Link>
        )
    };


    render() {
        const { level, win, controls } = this.props;
        const chunkSize = this.getChunkSize();
        const players = level.entities.filter(e => e.type === "player");

        return (
            <div className={"play-container"}>
                <KeyboardControls controls={controls} players={players}>
                    <TouchControls controls={controls} players={players}>

                        <DisplayLevel win={win} level={level} chunkSize={chunkSize}/>

                        {this.renderWin()}

                        <div className={"controls"}>
                            <GameControls controls={controls} />
                        </div>
                    </TouchControls>
                </KeyboardControls>
            </div>
        )
    }
}

export default PlayLevel;