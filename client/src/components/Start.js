import React, { Component } from 'react';
import Header from './Header';


export class Start extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>
                    <p>Register or login if you want to use TaskList.</p>
                </div>
            </div>
        )
    }
}

export default Start
