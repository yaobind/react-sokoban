import React from 'react'
import PropType from 'prop-types'

import {getLevels as getTestLevels} from "../../../../assets/levels/testLevels";
import {getLevels as getIntroLevels} from "../../../../assets/levels/intoLevels";
import {getLevels as getOriginalLevels} from "../../../../assets/levels/originalLevels";

export class LevelProvider extends React.PureComponent {

    static propTypes = {
        children: PropType.func.isRequired,
        categories: PropType.array
    };

    state = {
        levels: {}
    };

    componentWillMount() {

        const { categories } = this.props;
        const mapLevelCategories = {
            intro: getIntroLevels,
            test: getTestLevels,
            original: () => getOriginalLevels(0, 10)
        };

        categories.map(category => {
            const loadLevel = mapLevelCategories[category];
            if (loadLevel) {
                loadLevel().then(this.handleLoadLevels(category));
            }
            return category;
        });
    }

    handleLoadLevels = category => (levels) => {
        const newLevels = levels.map((l) => ({
            ...l,
            id: `${l.category}-${l.name}`.split(" ").join("-")
        }));

        this.setState(prev => ({
            levels: {
                ...prev.levels,
                [category]: newLevels
            }
        }))
    };

    render() {

        const { children: renderProp } = this.props;
        const { levels } = this.state;
        const levelsArray = Object.values(levels)
            .reduce((acc, value) => ([
                ...acc,
                ...value || []
            ]), []);

        return renderProp(levelsArray, !!levelsArray.length)
    }
}

export default LevelProvider;