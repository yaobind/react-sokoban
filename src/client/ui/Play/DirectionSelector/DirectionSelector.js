import React from 'react'

export class DirectionSelector extends React.Component {
    render() {
        const {onSelect} = this.props;
        return (
            <div className={"direction-selector-container"}>
                <button className={"direction-selector-button"} onClick={() => onSelect('north')}>UP only</button>
                <button className={"direction-selector-button"} onClick={() => onSelect('south')}>DOWN only</button>
                <button className={"direction-selector-button"} onClick={() => onSelect('west')}>LEFT only</button>
                <button className={"direction-selector-button"} onClick={() => onSelect('east')}>RIGHT only</button>
            </div>
        )
    }
}

export default DirectionSelector;