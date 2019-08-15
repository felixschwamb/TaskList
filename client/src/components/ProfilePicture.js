import React, { Component } from 'react'
import placeholderPic from '../images/profilePlaceholder.png'


export class ProfilePicture extends Component {

    // componentDidMount = () => {

    //   };

    // componentDidUpdate = (prevProps) => {
    //     // if (this.props.user.avatar !== prevProps.user.avatar) {
    //     //     console.log('there was a change in avatars!')
    //     // }
    // }


    render() {

        let profilePicture
        if (!this.props.user.avatarAvailable) {
            profilePicture = (
                <img className="picture" src={placeholderPic} alt=""></img>
            )
        } else {
            let userId = this.props.user._id
            let urlImg = 'http://localhost:5000/users/' + userId + '/avatar'
            
            profilePicture = (
                <img className="picture" src={urlImg} alt=""/>
            )
        }
          
        return (
            <div>
                {profilePicture}
            </div>
        )
    }
}

export default ProfilePicture
