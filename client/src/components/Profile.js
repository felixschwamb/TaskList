import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import ProfileUpdateForm from './ProfileUpdateForm';
import ErrorMessage from './ErrorMessage';
import ProfilePicture from './ProfilePicture';


export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            profileChangeActive: false,
            name: '',
            email: '',
            passwordChangeActive: false,
            oldPassword: '',
            password: '',
            passwordII: '',
            passwordMatch: true,
            inputAvail: false,
            passwChangeSuccess: false,
        }
      }
    
    componentDidMount = async () => {
        // await this.props.showProfile();
        const name = this.props.user.name
        const email = this.props.user.email

        this.setState({ name, email })

        // Prevent that error message is shown when Login-screen is loaded
        // if this.props.erros contains errors these are cleared because the login process starts new  
        if (this.props.errors !== '') {
            this.props.clearErrorSignLog()
            console.log('errors are cleared')
        }
      };


    // Update of component, when this.props.errors changes
    // due to this update the error message is shown
    componentDidUpdate = (prevProps) => {
        if (this.props.errors !== prevProps.errors) {
            console.log('there was a change! Current state: ', this.props.errors)
        }
    }

    openPasswChange = () => {
        this.setState({ passwordChangeActive: true, passwChangeSuccess: false })
    }

    cancelPasswChange = () => {
        this.setState({ passwordChangeActive: false })
        this.props.cancelPasswordUpdate()
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.formValidation())

        // errors are cleared as soon as user changes input
        this.props.clearErrorSignLog()
    }

    openProfileChange = () => {
        this.setState({ profileChangeActive: true })
    }

    closeProfileChange = () => {
        this.setState({ profileChangeActive: false })
    }

    showProfileChange = (name, email) => {
        this.setState({ name, email })
    }

    formValidation = () => {
        if (this.state.oldPassword !== '' && this.state.password !== '' && this.state.passwordII) {
            this.setState({
                inputAvail: true,
            })
        } else {
            this.setState({
                inputAvail: false,
            })
        }
        this.passwMatchValidation()
    }

    passwMatchValidation = () => {
        if (this.state.password === this.state.passwordII) {
            this.setState({
                passwordMatch: true,
            })
        } else {
            this.setState({
                passwordMatch: false,
            })
        }
    }

    savePasswChange = async (e) => {
        e.preventDefault()
        await this.props.updatePassword(this.props.user.email, this.state.oldPassword, this.state.password)
        console.log('errors: ', this.props.errors)
        if (this.props.errors.length === 0) {
            this.setState({ passwordChangeActive: false, passwChangeSuccess: true })
        }
    }


    onChangeFile = (e) => {
        const file = e.target.files[0]
        console.log('input files: ', file)
        const data = new FormData()
        data.append('avatar', file)
        this.props.addPicture(data)
    }

    
    render() {
        let deleteAvatar
        if (this.props.user.avatarAvailable) {
            deleteAvatar = (
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="profileIcon edAvatarIcon"
                    onClick={this.props.deletePicture}
                />
            )
        }


        let profileChangeForm
        if (!this.state.profileChangeActive) {
            profileChangeForm = (
                <div className="profileInfoContainer">
                    <div className="profileIconContainer">
                        <FontAwesomeIcon icon={faPen}
                            className="profileIcon"
                            onClick={this.openProfileChange} 
                        />
                    </div>

                    <div className="profileInfoItemContainer">
                        <div className="profileInfoItemName">
                            <p>Name: </p>
                        </div>
                            <p>{this.state.name}</p>
                    </div>
                    <div className="profileInfoItemContainer">
                        <div className="profileInfoItemName">
                            <p>Email: </p>
                        </div>
                            <p>{this.state.email}</p>
                    </div>
                </div>
            )

        } else {
            profileChangeForm = (
                <ProfileUpdateForm
                    profilePicture={this.profilePicture}
                    user={this.props.user}
                    name={this.state.name}
                    email={this.state.email}
                    updateProfile={this.props.updateProfile}
                    showProfileChange={this.showProfileChange}
                    closeProfileChange={this.closeProfileChange}
                    addPicture={this.props.addPicture}
                />
            )
        }

        let passwordMatch
        if (!this.state.passwordMatch) {
            passwordMatch = (
                <ErrorMessage
                    error={'The new passwords do not match!'}
                />
            )
        }


        let saveButton
        if (this.state.inputAvail && this.state.passwordMatch) {
            saveButton = (
                <button className="btn" disabled={false} onClick={this.savePasswChange}>Save</button>
            )
        } else {
            saveButton = (
                <button 
                    className="disabledButton" disabled={true}>Save</button>
            )
        }

        // Show error message if updating password returned an error
        let errorMessage
        if (this.props.errors.length > 0) {
            errorMessage = (
                this.props.errors.map(error =>
                    <ErrorMessage
                        key={error.id}
                        error={error.error}
                    />
                )
            )
        } else {
            errorMessage = (
                <div></div>
            )
        }

        let passwChangeSuccessMsg
        if (this.state.passwChangeSuccess) {
            passwChangeSuccessMsg = (
                
                <div className="passwChangeSucMsgCont">
                    <FontAwesomeIcon icon={faCheckCircle} className="passwChangeSucMsgIcon" />
                    <p className="passwChangeSucMsgText">Password changed</p>
                </div>
                
            )
        }


        let passwChangeForm
        if (!this.state.passwordChangeActive) {
            passwChangeForm = (
                <div className="passwChangeBtnSucMsg">
                    <button 
                        className="btn" 
                        onClick={this.openPasswChange}
                        >
                        Change password
                    </button>
                    {passwChangeSuccessMsg}
                </div>
            )
        } else {
            passwChangeForm = (
                <div>
                    <form 
                    // onSubmit={this.onSubmit}
                    >
                    <div className="passwordChangeInpCont">
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Old password"
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                        <input
                            className="signLogInput"
                            type="password"
                            name="password"
                            placeholder="New password"
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                        <input
                            className="signLogInput"
                            type="password"
                            name="passwordII"
                            placeholder="Repeate new password"
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                        <div className="signLogButtonContainer">
                            {saveButton}
                            {/* <button className="btn">Save</button> */}
                            <button className="btn" onClick={this.cancelPasswChange}>Cancel</button>
                        </div>
                        {passwordMatch}
                        {errorMessage}                                            
                        </div>
                    </form>
                </div>
            )
        }

        
        return (
            <div className="pageContentContainer">
                <p>Your profile information:</p>

                <div className="profileInfoContainer">
                <div className="profileIconContainer">  
                    <div className="two-el-cont">
                        <label>
                            <FontAwesomeIcon 
                                icon={faPen} 
                                className="profileIcon edAvatarIcon"
                            />
                            <form>
                                <input type="file" name="avatar" className="selectFile" onChange={this.onChangeFile}/>
                            </form>
                        </label>
                        
                        {deleteAvatar}
                    </div>
                </div>

                <div className="profileInfoItemContainer profilePicture">

                    <div className="profileInfoItemName">
                        <p>Profile picture: </p>
                    </div>
                        
                    <ProfilePicture 
                        user={this.props.user}
                    /> 

                

                </div>
                </div>

                {profileChangeForm}

                <div className="passwordChangeCont">
                    {passwChangeForm}
                </div>
            </div>
        )
    }
}

export default Profile
