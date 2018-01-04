import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";

import Play from '../Play'

import './Startup.css'
import Header from "../Header/Header";
import Home from "../Home/Home";
import About from "../About/About";
import Help from "../Help/Help";

const Startup = () => {
    return (
        <Router>
            <div className={"App"}>
                <Header />
                <div className={"container main"}>
                    <Route path={"/play"} component={Play} />
                    <Route path={"/about"} component={About} />
                    <Route path={"/help"} component={Help} />
                    <Route exact path={"/"} component={Home} />
                </div>
            </div>
        </Router>
    )
};

export default Startup;