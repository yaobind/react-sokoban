import React from 'react'
import PropTypes from 'prop-types'

import DisplayLevel from "../../DisplayLevel/DisplayLevel";


export class LevelPreview extends React.Component {

    static propTypes = {
      win: PropTypes.bool.isRequired,
      level: PropTypes.object.isRequired
    };

    render() {

        const { level, win} = this.props;

        return (
            <div>

                <DisplayLevel preview level={level} chunkSize={240 / Math.max(level.width, level.height)}/>
                {win &&
                <div className={"level-complete"}>Level<br/>complete!</div>
                }
            </div>
        )
    }
}

export default LevelPreview;