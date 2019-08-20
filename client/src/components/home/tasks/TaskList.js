import React, { Component } from 'react'
import TaskItem from './TaskItem';

export class TaskList extends Component {
  render() {
    return this.props.tasks.map(task => (
      <TaskItem
        key={task._id}
        task={task}
        deleteTask={this.props.deleteTask}
        checkTask={this.props.checkTask}
        saveUpdate={this.props.saveUpdate}
      />
    ));
  }
}

export default TaskList
