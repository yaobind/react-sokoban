import React from 'react'
import PropType from 'prop-types'

import { getLevels as getTestLevels } from "../../../../assets/levels/testLevels";
import { getLevels as getIntroLevels } from "../../../../assets/levels/intoLevels";
import { getLevels as getOriginalLevels } from "../../../../assets/levels/originalLevels";

export class LevelProvider extends React.PureComponent {

    static propTypes = {
        children: PropType.func.isRequired,
        categories: PropType.array
    };

    state = {
        levels: {},
        _loadingLevels: {},
        loadedCategoriesCount: 0,
    };

    componentWillMount() {

        const { categories } = this.props;
        const mapLevelCategories = {
            intro: getIntroLevels,
            test: getTestLevels,
            original: () => getOriginalLevels(0, 10)
        };
        const categoriesCount = categories.length;

        categories.map((category) => {
            const loadLevel = mapLevelCategories[category];
            if (loadLevel) {
                // NOTE: this is async
                loadLevel().then(this.handleLoadLevels(category, categoriesCount));
            }
            return category;
        });
    }

    handleLoadLevels = (category, categoriesCount) => (levels) => {
        const newLevels = levels.map((l) => ({
            ...l,
            id: `${l.category}-${l.name}`.split(" ").join("-")
        }));

        this.setState(prev => ({
            _loadingLevels: {
                ...prev._loadingLevels,
                [category]: newLevels
            },
            loadedCategoriesCount: prev.loadedCategoriesCount + 1,
        }));


        if (categoriesCount === this.state.loadedCategoriesCount) {
            this.setState({levels: this.state._loadingLevels});
        }
    };

    render() {

        const { children: renderProp } = this.props;
        const { levels } = this.state;
        const levelsArray = Object.values(levels)
            .reduce((acc, value) => ([
                ...acc,
                ...value || []
            ]), []);
        const isLoaded = levelsArray && levelsArray.length;

        return renderProp(levelsArray, isLoaded);
    }
}

export default LevelProvider;