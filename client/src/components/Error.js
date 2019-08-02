import React, { Component } from 'react';
import Header from './Header';


export class Error extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>
                    <p>This page is not available.</p>
                </div>
            </div>
        )
    }
}

export default Error
