import React, { Component } from 'react'

export class TaskNumber extends Component {
    render() {
        return (
            <div className="taskNumContainer">
                <div className="taskNumContainerSingle">
                    <p className="taskNumText">total:</p>
                    {this.props.totalNumTasks}
                </div>
                <div className="taskNumContainerSingle">
                    <p className="taskNumText">completed:</p>
                    {this.props.numCompletedTasks}
                </div>
                <div className="taskNumContainerSingle">
                    <p className="taskNumText">uncompleted:</p>
                    {this.props.numUncompletedTasks}    
                </div>                
            </div>
        )
    }
}

export default TaskNumber
