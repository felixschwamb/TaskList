import React, { Component } from 'react'

export class Greeting extends Component {
    render() {
        return (
            <div className="greetingContainer">
                <p>Hello {this.props.userName}!</p>
            </div>
        )
    }
}

export default Greeting
