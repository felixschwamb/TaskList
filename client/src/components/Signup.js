import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import ErrorMessage from './ErrorMessage';


export class Signup extends Component {
    constructor() {
        super()
        this.state = {
          name: '',
          email: '',
          password: '',
          passwordII: '',
          passwordMatch: true,
          inputAvail: false,
        }
      }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.formValidation())
        // }, () => this.validateUser(this.state.name, this.state.email, this.state.password))
            // alternative solution when onChange a http request is sent to the server to validate the input
    }

    formValidation = () => {
        if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.passwordII !== '') {
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


    onSubmit = async (e) => {
        e.preventDefault()
        
        
        if (this.state.inputAvail && this.state.passwordMatch) {
        
        await this.props.registerUser(this.state.name, this.state.email, this.state.password)
        // with asyc/await home is only loaded registration of user is done (not necessarily a successfull registration yet)

            if (this.props.token) {
                this.props.history.push('/home')
            }
        } 
    }

    onCancel = () => {
        this.props.history.push('/')
    }


    // alternative solution to do validation of input in registration form
    // onChange in input form there is an http request to validate the input
    
    // validateUser = async (name, email, password) => {
    //     const data = {name, email, password}
    
    //     const options = {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(data)
    //     };
      
    //     let response = await fetch("/user/check", options);
    //     console.log("post-request: ", response);
    //     let validationResult = await response.json();
    //     console.log('validationResult: ', validationResult)
    // }
    
    render() {

        let signUpButton
        if (this.state.inputAvail && this.state.passwordMatch) {
            signUpButton = (
                <button 
                    id="signup"
                    disabled={false}>
                    Register
                </button>
            )
        } else {
            signUpButton = (
                <button 
                    // id="signup"
                    className="disabledButton"
                    disabled={true}>
                    Register
                </button>
            )
        }
        
    
        // Show error message if passwords entered in the two password fields do not match
        let passwordMatch
        if (!this.state.passwordMatch) {
            passwordMatch = (
                <ErrorMessage
                    error={'The entered passwords do not match!'}
                />
            )
        }
        
    // Show error message if email invalid and password not at least six characters
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
    
        
        return (
            <div>
                <Header />
                <div className="signLogcontainer">
                    <form 
                        className="signLogFormContainer" 
                        onSubmit={this.onSubmit}>

                        <p className="signLogHeader">Registration</p>
                        <div className="signLogInputContainer">
                            <input
                            className="signLogInput"
                            type="text"
                            name="name"
                            placeholder="name*"
                            value={this.state.name}
                            onChange={this.onChange}
                            />
                            <input
                            className="signLogInput"
                            type="text"
                            name="email"
                            placeholder="email*"
                            value={this.state.email}
                            onChange={this.onChange}
                            />
                            <input
                            className="signLogInput"
                            type="password"
                            name="password"
                            placeholder="password* (more than six characters)"
                            value={this.state.password}
                            onChange={this.onChange}
                            />
                            <input
                            className="signLogInput"
                            type="password"
                            name="passwordII"
                            placeholder="repeate password*"
                            value={this.state.passwordII}
                            onChange={this.onChange}
                            />
                        </div>

                        <div className="signLogButtonContainer">
                            {signUpButton}
                            {/* <button 
                                id="signup"
                                disabled={true}>
                                Signup
                            </button> */}
                            <button 
                                id="cancelSignLog" 
                                onClick={this.onCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div className="signLogErrorMsgContainer">
                        {passwordMatch}
                        {errorMessage}
                    </div>
                </div>    
            </div>
        )
    }
}

// 'withRouter' is an higher order component, with this in place 'history.push' can be used, even though the target URL is not on the stack yet
export default withRouter(Signup)
