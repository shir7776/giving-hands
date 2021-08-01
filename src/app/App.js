import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import createApiClient from '../api'
import { BrowserRouter as Router, Switch,  Redirect} from 'react-router-dom';
import LoginModal from "react-login-modal";
import logo from "../logo.jpg"
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "../routs/home/homePage";
import AssignGivers from "../routs/assignGivers/assignGivers";
import GiversManagement from "../routs/giversMenagement/giversManagement";
import GiveConfirmation from "../routs/giveComfirmation/giveConfirmation";
import locationManagement from "../routs/locationMenagement/locationManagement";
import Statistics from "../routs/statistics/statistics";
import Blog from "../routs/blog/blog";

const api = createApiClient
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      login:this.login,
      currpage:<div>hello</div>
    }
  }
  handleSignup = (username, email, password) => {};
  handleLogin = (username, password) => {}
  on=()=>{
    this.setState(
      {currpage:Home}
    )
  }
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return ( 
      // <LoginModal
      //       handleSignup={this.handleSignup}
      //       handleLogin={this.handleLogin}
      //     />




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
            <Route path="/locationManagement" component={locationManagement}/>
            <Route path="/statistics" component={Statistics}/>
            <Route path="/blog" component={Blog}/>
          </div>
          </div>
        </HashRouter>
    );
  }
}

export default App;
