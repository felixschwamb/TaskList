import React, { Component } from 'react'

export class Greeting extends Component {
    render() {
        return (
            <div className="greetingContainer">
                <p>Hello {this.props.userName}, these are your tasks:</p>
            </div>
        )
    }
}

export default Greeting
