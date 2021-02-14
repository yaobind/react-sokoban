import React from 'react'
import './TeamDirections.css'

export class TeamDirections extends React.Component {
    render() {
        const {myTeam, playermap, localPlayer} = this.props;
        const myTeamMembers = Object.keys(playermap).filter(player => playermap[player].team === myTeam);
        const northPlayer = myTeamMembers.find(player => playermap[player].dirlimit === 'north');
        const southPlayer = myTeamMembers.find(player => playermap[player].dirlimit === 'south');
        const eastPlayer = myTeamMembers.find(player => playermap[player].dirlimit === 'east');
        const westPlayer = myTeamMembers.find(player => playermap[player].dirlimit === 'west');


        return (
            <div className={"keys"}>
                <div className={`up arr ${localPlayer === northPlayer ? "me" : ""}`}>{northPlayer}</div>
                <br />
                <div className={`left arr ${localPlayer === westPlayer ? "me" : ""}`}>{westPlayer}</div>  
                <div className={`down arr ${localPlayer === southPlayer ? "me" : ""}`}>{southPlayer}</div>
                <div className={`right arr ${localPlayer === eastPlayer ? "me" : ""}`}>{eastPlayer}</div>
            </div>
        )
    }
}

export default TeamDirections;