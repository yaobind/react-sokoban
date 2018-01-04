import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import * as _ from 'underscore'

import "./LevelList.css"
import LevelPreview from "./LevelPreview/LevelPreview";

export class LevelList extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        levels: PropTypes.array.isRequired,
        hasWon: PropTypes.func
    };

    render() {
        const { levels, match, hasWon } = this.props;
        const levelsByCategory = _.groupBy(levels, "category");
        const categoryKeys = Object.keys(levelsByCategory);

        return (
            <div className={"LevelList"}>
                <h2>Choose level</h2>
                {categoryKeys.length ? null : <h3>No level found</h3>}
                {categoryKeys.map(category => (
                    <div key={`level-list-${category}`} className={"category-section"}>
                        <h3>{category !== "undefined" ? category : "Misc"}</h3>
                        <ul className={"levels"}>
                            {levelsByCategory[category].map((level) => (
                                <li className={"level"} key={level.id}>
                                    <Link className={"item"} to={`${match.url}/${level.id}`}>
                                        <LevelPreview win={hasWon(level.id)} level={level}/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    }
}

export default LevelList;