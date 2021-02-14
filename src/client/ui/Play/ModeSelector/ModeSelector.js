import React from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

export class ModeSelector extends React.Component {
    render() {
        const {onToggle, isTeamMode} = this.props;
        return (
            <Toggle id='mode-selector' className="mode-selector" checked={isTeamMode} onChange={onToggle} />
        )
    }
}

export default ModeSelector;