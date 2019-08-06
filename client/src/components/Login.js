import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import ErrorMessage from './ErrorMessage';


export class Signup extends Component {
    constructor() {
        super()
        this.state = {
          email: '',
          password: '',
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
        if (this.state.email !== '' && this.state.password !== '') {
            this.setState({
                inputAvail: true,
            })
        } else {
            this.setState({
                inputAvail: false,
            })
        }
    }


    onSubmit = async (e) => {
        e.preventDefault()
        
        if (this.state.inputAvail) {
        
        await this.props.loginUser(this.state.email, this.state.password)
        // with asyc/await home is only loaded when registration of user is done (not necessarily a successfull registration yet)

            if (this.props.token) {
                this.props.history.push('/home')
            }
        } 
    }

    onCancel = () => {
        this.props.history.push('/')
    }
    
    render() {

        let signUpButton
        if (this.state.inputAvail) {
            signUpButton = (
                <button 
                    id="signup"
                    disabled={false}>
                    Login
                </button>
            )
        } else {
            signUpButton = (
                <button 
                    // id="signup"
                    className="disabledButton"
                    disabled={true}>
                    Login
                </button>
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

                        <p className="signLogHeader">Login</p>
                        <div className="signLogInputContainer">
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
                        </div>

                        <div className="signLogButtonContainer">
                            {signUpButton}
                            <button 
                                id="cancelSignLog" 
                                onClick={this.onCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div className="signLogErrorMsgContainer">
                        {errorMessage}
                    </div>
                </div>    
            </div>
        )
    }
}

// 'withRouter' is an higher order component, with this in place 'history.push' can be used, even though the target URL is not on the stack yet
export default withRouter(Signup)
