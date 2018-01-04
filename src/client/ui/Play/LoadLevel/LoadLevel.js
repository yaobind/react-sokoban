import React from 'react'
import PropTypes from 'prop-types'

import * as _ from 'underscore'

/**
 * LoadLevel
 *
 * Component in charge of updating a level's entities and check they integrity
 *
 * @property level, the level to load and update
 * @property children: a renderProp. In charge of rendering the level.
 *
 */

export class LoadLevel extends React.Component {

    static propTypes = {
        level: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            id: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            entities: PropTypes.array.isRequired
        }).isRequired,

        children: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
    };

    state = {};

    checkEntity = (rules) => entity => {
        return rules
            .filter(r => r.type === "entityCheck")
            .filter(r => r.target === entity.type)
            .reduce((acc, rule) => {
                return {
                    ...(rule.defaultProps || {}),
                    ...acc,
                    ...(rule.props || {})
                };
            }, entity);
    };

    updateLevel = (level, entities) => {
        const newEntities = entities || (level && level.entities);

        if (level && newEntities) {
            this.setState({
                level : {
                    ...level,
                    entities: _.sortBy(newEntities.map(this.checkEntity(level.rules)), (e) => e.trigger)
                }
            })
        }
    };

    componentWillMount() {
        const { level } = this.props;

        this.updateLevel(level);

    }

    updateEntities = (entities) => {
        const { level } = this.props;

        if (!entities || ! Array.isArray(entities)) return ;
        this.updateLevel(level, entities);
    };

    render() {
        const { children: renderProp, goBack, level: initialState } = this.props;
        const { level } = this.state;

        if (!initialState && !level) {
            goBack();
            return <div>Invalid</div>;
        }
        return (
            <div>
                {renderProp(level, this.updateEntities, initialState)}
            </div>
        )
    }
}

export default LoadLevel;