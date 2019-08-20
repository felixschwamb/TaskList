import React, { Component } from 'react'

export class ErrorMessage extends Component {
    render() {
        return (
                <div className="signLogErrorContainer">
                    <p className="signLogErrorText">{this.props.error}</p>
                </div>
        )
    }
}

export default ErrorMessage
