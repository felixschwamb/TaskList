import React, { Component } from 'react'
import Dropdown from './Dropdown';

import placeholderPic from '../../images/profilePlaceholder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'



export class HeaderPic extends Component {
    constructor() {
        super();
        this.state = {
            showDropdown: false,
        };
      }

    toggleDropdown = () => {
        this.state.showDropdown ? this.setState({showDropdown: false}) : this.setState({showDropdown: true})
    }

    render() {

        let dropdownButton
        if (this.props.token) {
            dropdownButton = (
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className="clickableItem"
                    onClick={this.toggleDropdown}
                />  
            )
        }
           
        
        let profilePicture
        if (this.props.token) {
            if (!this.props.user.avatarAvailable) {
                profilePicture = (
                    <img className="pictureHeader" src={placeholderPic} alt=""></img>
                )
            } else {
                let userId = this.props.user._id
                let urlImg = 'http://localhost:5000/users/' + userId + '/avatar'
                
                profilePicture = (
                    <img className="pictureHeader" src={urlImg} alt=""/>
                )
            }
        }

        let dropdown
        if (this.state.showDropdown) {
            dropdown = (
                <Dropdown 
                    toggleDropdown={this.toggleDropdown}
                    userName={this.props.user.name}
                    token={this.props.token}
                />
            )
        }
        

        return (
            <div className="pictureHeaderContainer">
                {profilePicture}
                <div className="dropdown">
                    {dropdownButton}                    
                    {dropdown}
                </div> 
                
            </div>
        )
    }
}

export default HeaderPic
