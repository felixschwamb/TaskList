import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import HeaderPic from './HeaderPic';




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


        return (
            <div className="navBar">
                <div className="headerNavBar">
                    <Header />               

                    <ul className="navBarList">
                        {/* <li className="navBarItem">
                            <NavLink to="/" exact activeStyle={{ color: "#26a69a" }}>TaskList</NavLink>
                        </li> */}
                        {homeLink}
                        {registerLink}
                        {loginLink}
                    </ul>
                </div>
                

                <HeaderPic
                    user={this.props.user}
                    token={this.props.token}
                />
            </div>
        )
    }
}

export default Navigation