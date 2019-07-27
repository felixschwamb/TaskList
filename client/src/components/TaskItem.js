import React, { Component } from 'react';
import TaskItemContent from './TaskItemContent';
import UpdateForm from './UpdateForm';




export class TaskItem extends Component {

  constructor() {
    super()
    this.state = {
      updFormActive: false
    }
  }

  updateFormOpen = () => {
    this.setState({ updFormActive: true })
  }

  cancelUpdateForm = () => {
    this.setState({ updFormActive: false })
  }

    render() {

      let taskItemContent
      if (!this.state.updFormActive) {
        taskItemContent = (
          <article className="taskItem">
            <TaskItemContent
              task={this.props.task}
              deleteTask={this.props.deleteTask}
              checkTask={this.props.checkTask}
              updateFormOpen={this.updateFormOpen}
            />
          </article>
        );
      } else {
        taskItemContent = (
          <article className="taskItem">
            <UpdateForm
              task={this.props.task}
              saveUpdate={this.props.saveUpdate}
              cancelUpdateForm={this.cancelUpdateForm}
            />
          </article>
        );
      }
      
        return (
          <React.Fragment>
            {taskItemContent}
          </React.Fragment>
        );
    }
}

export default TaskItem
