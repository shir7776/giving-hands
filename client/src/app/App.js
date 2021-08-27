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
import {giversAPI} from "../API/giversAPI";
//import socketClient  from "socket.io-client";
import {Chat} from "../components/chat/chat";

const api = createApiClient
export const App = () => {
    const keepLoging = ()=>{
        let data = JSON.parse(sessionStorage.getItem("user"));
        if(data==null)
            return false;
        let type2 = data['type'];
        if(type2!=null){
            return {type: type2};
        }
        else{
            return false;
        }
    }

    const [givers, setGivers] = useState(giversAPI.getGivers)
    const [cuurpage, setCurrpage] = useState(<div>hello</div>)
    //const [person, setPerson] = useState({type:"sfsf"})
     const [person, setPerson] = useState(keepLoging)
    useEffect(() => {
            setCurrpage(Home)
        }, []
    )


    console.log("Host URL" + process.env.PUBLIC_URL);
    const type = person.type === "manager"




    return (

        !person ?
            <Login setPerson={setPerson}/>
            :


            <HashRouter>
                <div>
                    <ul className="header2">
                        <li><img className="Logo" src={logo} alt="Logo"/>
                            <ul>
                                <li><NavLink to="/">Home</NavLink></li>

                                {type &&
                                <li><NavLink to="/assignGivers">Assign Givers</NavLink></li>}
                                {type &&
                                <li><NavLink to="/giversManagement">Givers Management</NavLink>
                                </li>}
                                {!type &&
                                <li><NavLink to="/giveConfirmation">Give Confirmation</NavLink>
                                </li>}
                                {type &&
                                <li><NavLink to="/locationManagement">Location
                                    Management</NavLink></li>}
                                {type &&
                                <li><NavLink to="/statistics">Statistics</NavLink></li>}
                                <li><NavLink to="/blog">Blog</NavLink></li>
                                <li className="logout"><NavLink to="/"
                                                                onClick={() => {sessionStorage.removeItem("user"); setPerson(false);}}>logout</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="header">
                        <li><img className="Logo" src={logo} alt="Logo"/></li>
                        <li><NavLink to="/">Home</NavLink></li>

                        {type &&
                        <li><NavLink to="/assignGivers">Assign Givers</NavLink></li>}
                        {type &&
                        <li><NavLink to="/giversManagement">Givers Management</NavLink></li>}
                        {!type &&
                        <li><NavLink to="/giveConfirmation">Give Confirmation</NavLink></li>}
                        {type &&
                        <li><NavLink to="/locationManagement">Location Management</NavLink></li>}
                        {type &&
                        <li><NavLink to="/statistics">Statistics</NavLink></li>}
                        <li><NavLink to="/blog">Blog</NavLink></li>
                        <li className="logout"><NavLink to="/"
                                                        onClick={() => setPerson(false)}>logout</NavLink>
                        </li>
                    </ul>




                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/assignGivers" component={AssignGivers} isAuthed={type}/>
                        <Route path="/giversManagement" component={GiversManagement}
                               isAuthed={type}/>
                        <Route path="/giveConfirmation" component={GiveConfirmation}
                               isAuthed={type}/>
                        <Route path="/locationManagement" component={LocationManagement}
                               isAuthed={type}/>
                        <Route path="/statistics" component={Statistics} isAuthed={type}/>
                        <Route path="/blog" render={() => <Blog type={type}/>}/>
                    </div>
                </div>
            </HashRouter>
    );

}


