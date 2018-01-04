import React from 'react'
import {Link} from "react-router-dom";

export class Header extends React.Component {

    render() {
        return (
            <header className={"nav-header"}>
                <div className={"container"}>
                    <nav className={"navigation"}>
                        <ol className={"list"}>
                            <li className={"item"}><Link className={"link"} to={"/"}>Home</Link></li>
                        </ol>
                        <ol className={"list right"}>
                            <li className={"item"}><Link className={"link"} to={"/play"}>Play</Link></li>
                            <li className={"item"}><Link className={"link"} to={"/about"}>About</Link></li>
                            <li className={"item"}><Link className={"link"} to={"/help"}>Help</Link></li>
                        </ol>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;