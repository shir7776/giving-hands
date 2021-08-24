import React, {Component, useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import createApiClient from '../api'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import LoginModal from "react-login-modal";
import logo from "../logo.jpg"
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
// import Home from "../routs/home/homePage";
import {Home} from "../routs/home/home_page";
// import AssignGivers from "../routs/assignGivers/assignGivers";
import {AssignGivers} from "../routs/assignGivers/assign_givers";
// import GiversManagement from "../routs/giversMenagement/giversManagement";
import {GiversManagement} from "../routs/giversMenagement/givers_management";
// import GiveConfirmation from "../routs/giveComfirmation/giveConfirmation";
import {GiveConfirmation} from "../routs/giveComfirmation/give_confirmation";
// import locationManagement from "../routs/locationMenagement/locationManagement";
import {LocationManagement} from "../routs/locationMenagement/location_management";
import Statistics from "../routs/statistics/statistics";
//import Blog from "../routs/blog/blog";
import {Blog} from "../routs/blog/blogs";
import {Login} from "../components/login/login";

const api = createApiClient
export const App = () => {

    const [login, setLogin] = useState("this.login")
    const [cuurpage, setCurrpage] = useState(<div>hello</div>)
    const [person, setPerson] = useState(false)
    useEffect(() => {
            setCurrpage(Home)
        }, []
    )


    console.log("Host URL" + process.env.PUBLIC_URL);
    return (

        !person ?
            <Login setPerson={setPerson}/>
            :


            <HashRouter>
                <div>
                    <h1>Simple SPA</h1>

                    <ul className="header">
                        <li><img className="Logo" src={logo} alt="Logo"/></li>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/assignGivers">Assign Givers</NavLink></li>
                        <li><NavLink to="/giversManagement">Givers Management</NavLink></li>
                        <li><NavLink to="/giveConfirmation">Give Confirmation</NavLink></li>
                        <li><NavLink to="/locationManagement">Location Management</NavLink></li>
                        <li><NavLink to="/statistics">Statistics</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/assignGivers" component={AssignGivers}/>
                        <Route path="/giversManagement" component={GiversManagement}/>
                        <Route path="/giveConfirmation" component={GiveConfirmation}/>
                        <Route path="/locationManagement" component={LocationManagement}/>
                        <Route path="/statistics" component={Statistics}/>
                        <Route path="/blog" component={Blog}/>
                    </div>
                </div>
            </HashRouter>
    );

}


