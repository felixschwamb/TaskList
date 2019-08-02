import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

export class TaskItemContent extends Component {

  onClickItem = () => {
    console.log('task id: ', this.props.task._id)
  }
  render() {

    let checkIcon;
    if (!this.props.task.completed) {
      checkIcon = (
        <FontAwesomeIcon
          icon={faSquare}
          className="clickableItem fa-square"
          onClick={this.props.checkTask.bind(
            this,
            this.props.task._id
          )}
        />
      );
    } else {
      checkIcon = (
        <FontAwesomeIcon icon={faCheck} className="fa-check" />
      );
    }

    return (
      <div className="taskContent">
        <div className="checkIconContainer">{checkIcon}</div>

        <span className="desc">{this.props.task.title}</span>
        <div className="edDelButtons">
          <FontAwesomeIcon 
            icon={faPen} 
            className="clickableItem"
            onClick={this.props.updateFormOpen}
            />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="clickableItem"
            onClick={this.props.deleteTask.bind(this, this.props.task._id)}
            //onClick={this.onClickItem}
          />
        </div>
      </div>
    );
  };
};

export default TaskItemContent

