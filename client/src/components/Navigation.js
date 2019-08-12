import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';



export class Navigation extends Component {
    render() {

        let homeLink
        if (!this.props.token) {
            homeLink = (
                <li className="navBarItem">
                    <NavLink to="/" exact activeStyle={{ color: "#26a69a" }}>TaskList</NavLink>
                </li>
            )
        } else {
            homeLink = (
                <li className="navBarItem">
                    <NavLink to="/home" activeStyle={{ color: "#26a69a" }}>TaskList</NavLink>
                </li>
            )
        }

        let profileLink
        if (this.props.token) {
            profileLink = (
                <li className="navBarItem">
                    <NavLink to="/profile" activeStyle={{ color: "#26a69a" }}>Profile</NavLink>
                </li>
            )
        }

        let registerLink
        if (!this.props.token) {
            registerLink = (
                <li className="navBarItem">
                    <NavLink to="/signup" activeStyle={{ color: "#26a69a" }}>Register</NavLink>
                </li>
            )
        }

        let loginLink
        if (!this.props.token) {
            loginLink = (
                <li className="navBarItem">
                    <NavLink to="/login" activeStyle={{ color: "#26a69a" }}>Login</NavLink>
                </li>
            )
        }

        let logoutLink
        if (this.props.token) {
            logoutLink = (
                <li className="navBarItem">
                    <NavLink to="/logout" activeStyle={{ color: "#26a69a" }}>Logout</NavLink>
                </li>
            )
        }

        return (
            <div className="navBar">
                <Header />

                <ul className="navBarList">
                    {/* <li className="navBarItem">
                        <NavLink to="/" exact activeStyle={{ color: "#26a69a" }}>TaskList</NavLink>
                    </li> */}
                    {homeLink}
                    {profileLink}
                    {registerLink}
                    {loginLink}
                    {logoutLink}
                </ul>
                
            </div>
        )
    }
}

export default Navigation