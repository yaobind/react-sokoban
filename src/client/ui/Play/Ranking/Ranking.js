import React from 'react'

export class Ranking extends React.Component {
    render() {
        const {rank} = this.props;
        return (
            <ul>Ranking:
                {rank && rank.map((item, index) => <li key={index}>{index+1} {item.player}</li> )}
            </ul>
        )
    }
}

export default Ranking;