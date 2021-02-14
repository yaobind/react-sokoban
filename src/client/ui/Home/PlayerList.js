import React from 'react'

export class PlayerList extends React.Component {
    render() {
        const {players} = this.props;
        return (
            <ul>
                {players && players.map((playerName) =>
                    <li key={playerName}>
                        {playerName}
                    </li>
                )}
            </ul>
        )
    }
}

export default PlayerList;