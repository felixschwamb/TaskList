import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Greeting from './Greeting';

export class Dropdown extends Component {

    componentDidMount = () => {
        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClick)
    }


    handleClick = (e) => {
        // .contains checks if the clicked child (e.target) is a child of the dropdown (this.dropdown)
        // if it is no child of the dropdown the toggleDropdown() method is executed
        if (this.dropdown.contains(e.target)) {
            return
        }

        this.props.toggleDropdown()
    }

    render() {

        let profileLink
        if (this.props.token) {
            profileLink = (
                <li className="navBarItem navBarItemDropdown" onClick={this.props.toggleDropdown}>
                    <NavLink to="/profile" activeStyle={{ color: "#26a69a" }}>Profile</NavLink>
                </li>
            )
        }

        let logoutLink
        if (this.props.token) {
            logoutLink = (
                <li className="navBarItem navBarItemDropdown" onClick={this.props.toggleDropdown}>
                    <NavLink to="/logout" activeStyle={{ color: "#26a69a" }}>Logout</NavLink>
                </li>
            )
        }

        return (
            // callback is passed in the refs
            <div ref={node => this.dropdown = node} className="dropdown-content">
                    <Greeting 
                        userName={this.props.userName}
                    />
                    <ul className="navBarList navBarListDropdown">
                        {profileLink}
                        {logoutLink}
                    </ul>
            </div>
        )
    }
}

export default Dropdown
