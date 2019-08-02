import React, { Component } from 'react'
import Header from './Header';


export class Logout extends Component {

    onLogout = async () => {
        await this.props.logoutUser()
        this.props.history.push('/')

    }
    
    onCancel = () => {
        this.props.history.push('/home')
    }

    render() {
        return (
            <div>
                <Header />
                <div className="signLogcontainer">
                    <div 
                        className="signLogFormContainer" 
                        // onSubmit={this.onSubmit}
                        >

                        <p className="signLogHeader">Logout</p>
                        <p className="logoutText">Do you want to logout?</p>

                        {/* <div className="signLogInputContainer">
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
                        </div> */}

                        <div className="signLogButtonContainer">
                            {/* {signUpButton} */}
                            <button 
                                id="cancelSignLog" 
                                onClick={this.onLogout}
                                >
                                Logout
                            </button>
                            <button 
                                id="cancelSignLog" 
                                onClick={this.onCancel}
                                >
                                Cancel
                            </button>
                        </div>
                    </div>
                    {/* <div className="signLogErrorMsgContainer">
                        {errorMessage}
                    </div> */}
                </div>    
            </div>
        )
    }
}

export default Logout
