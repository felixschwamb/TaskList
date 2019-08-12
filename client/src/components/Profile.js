import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ProfileUpdateForm from './ProfileUpdateForm';
import ErrorMessage from './ErrorMessage';



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
      };

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
        console.log('new password: ', this.state.password)
        await this.props.updatePassword(this.props.user.email, this.state.oldPassword, this.state.password)
        console.log('errors: ', this.props.errors)
        if (this.props.errors.length === 0) {
            this.setState({ passwordChangeActive: false, passwChangeSuccess: true })
        }
    }
    
    render() {

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
                        <div className="profileInfoItemContent">
                            <p>{this.state.name}</p>
                        </div>
                    </div>
                    <div className="profileInfoItemContainer">
                        <div className="profileInfoItemName">
                            <p>Email: </p>
                        </div>
                        <div className="profileInfoItemContent">
                            <p>{this.state.email}</p>
                        </div>
                    </div>
                </div>
            )

        } else {
            profileChangeForm = (
                <ProfileUpdateForm
                    user={this.props.user}
                    name={this.state.name}
                    email={this.state.email}
                    updateProfile={this.props.updateProfile}
                    showProfileChange={this.showProfileChange}
                    closeProfileChange={this.closeProfileChange}
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
            <div>
                <div>
                    <p>Your profile information:</p>
                    
                    {profileChangeForm}

                        <div className="passwordChangeCont">
                            {passwChangeForm}
                        </div>
                </div>
            </div>
        )
    }
}

export default Profile
