import React, { Component } from 'react'
import TaskNumber from './TaskNumber';


export class FilterBar extends Component {
    render() {

        // completed filter:
            // filterCompleted: true -> filter by completed
            // filterCompleted: false -> filter by uncompleted
            // filterCompleted: '' -> no filtering for completed/uncompleted


        let uncompBtn = 
            this.props.filterCompleted === false ? 
                <button 
                    className="btn btnFilterActive"
                    onClick={() => this.props.filterComp('')}
                >uncompleted tasks</button> :
                <button 
                    className="btn"
                    onClick={() => this.props.filterComp(false)}
                >uncompleted tasks</button>
        
        let compBtn = 
            this.props.filterCompleted === true ? 
                    <button 
                        className="btn btnFilterActive"
                        onClick={() => this.props.filterComp('')}
                    >completed tasks</button> :
                    <button 
                        className="btn"
                        onClick={() => this.props.filterComp(true)}
                    >completed tasks</button>

        return (
            <div className="filterBarContainer">
                <TaskNumber
                    totalNumTasks={this.props.totalNumTasks}
                    numCompletedTasks={this.props.numCompletedTasks} 
                    numUncompletedTasks={this.props.numUncompletedTasks}          
                />
                <div className="filterContainer">
                    <p className="taskNumText">Filter: </p>
                    {uncompBtn}
                    {compBtn}
                </div>
                
            </div>
        )
    }
}

export default FilterBar
