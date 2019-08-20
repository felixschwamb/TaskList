import React, { Component } from 'react'

export class PaginationBar extends Component {
    render() {

        let firstStep = 
            this.props.numberOfItems === 5 ? 
                <p className="pagNumberActive">5</p> : 
                <p 
                    className="pagNumber"
                    onClick={() => this.props.pagOnClick(5)}
                >5</p>

        let secondStep = 
            this.props.numberOfItems === 10 ? 
                <p className="pagNumberActive">10</p> : 
                <p 
                    className="pagNumber"
                    onClick={() => this.props.pagOnClick(10)}
                >10</p>

        let thirdStep = 
            this.props.numberOfItems  === 'all' ? 
                <p className="pagNumberActive">all</p> : 
                <p 
                    className="pagNumber"
                    onClick={() => this.props.pagOnClick('all')}
                >all</p>


        return (
            <div className="paginationContainer">
                <div className="paginationBarContainer">
                    <p>Number of tasks shown: </p>
                    {firstStep}
                    <p>|</p>
                    {secondStep}
                    <p>|</p>
                    {thirdStep} 
                </div>
            </div>
            
        )
    }
}

export default PaginationBar
