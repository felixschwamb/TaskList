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
                        >

                        <p className="signLogHeader">Logout</p>
                        <p className="logoutText">Do you want to logout?</p>

                        <div className="signLogButtonContainer">
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
