import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export class Navigation extends Component {
    render() {
        return (
            <div>
            <ul className="navBar">
                <li className="navBarItem">
                    <NavLink to="/" exact activeStyle={{ color: "#26a69a" }}>Start</NavLink>
                </li>
                <li className="navBarItem">
                    <NavLink to="/signup" activeStyle={{ color: "#26a69a" }}>Register</NavLink>
                </li>
                <li className="navBarItem">
                    <NavLink to="/login" activeStyle={{ color: "#26a69a" }}>Login</NavLink>
                </li>
                <li className="navBarItem">
                    <NavLink to="/logout" activeStyle={{ color: "#26a69a" }}>Logout</NavLink>
                </li>
            </ul>
                
            </div>
        )
    }
}

export default Navigation