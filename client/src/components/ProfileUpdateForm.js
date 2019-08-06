    import React, { Component } from 'react'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { faCheck } from '@fortawesome/free-solid-svg-icons'
    import { faTimes } from '@fortawesome/free-solid-svg-icons'


    
    export class ProfileUpdateForm extends Component {
        constructor() {
            super()
            this.state = {
              name: '',
              email: ''
            }
          }

        componentDidMount = () => {
            const name = this.props.name
            const email = this.props.email
            this.setState({ name, email })
        }

        onChange = (e) => { 
            this.setState({
                [e.target.name]: e.target.value
        })}

        onSave = () => {
            const name = this.state.name
            const email = this.state.email
            this.props.updateProfile(name, email)
            this.props.closeProfileChange()
            this.props.showProfileChange(name, email)
        }

        render() {
            return (
                <div className="profileInfoContainer">
                    <div className="profileIconSavCanContainer">
                        <div className="profileIconContainer">
                            <FontAwesomeIcon icon={faCheck} 
                                id="profileCheck"
                                className="profileIcon"
                                onClick={this.onSave} 
                            />
                        </div>
                        <div className="profileIconContainer">
                                <FontAwesomeIcon icon={faTimes} 
                                    id="profileCross"
                                    className="profileIcon"
                                    onClick={this.props.closeProfileChange}
                                />
                        </div>
                    </div>


                    <div className="profileInfoItemContainer">
                        <div className="profileInfoItemName">
                            <p>Name: </p>
                        </div>
                        <input
                            // className="signLogInput"
                            type="text"
                            name="name"
                            placeholder="name*"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="profileInfoItemContainer">
                        <div className="profileInfoItemName">
                            <p>Email: </p>
                        </div>
                        <input

                            // className="signLogInput"
                            type="text"
                            name="email"
                            placeholder="email*"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            )
        }
    }
    
    export default ProfileUpdateForm
    