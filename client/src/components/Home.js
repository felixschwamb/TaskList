import React from 'react';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import PaginationBar from './PaginationBar';
import AddTask from './AddTask';
import '../App.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfItems: 5,
      filterCompleted: ''
    };
  }

  componentDidMount = () => {
    this.props.loadItems(this.state.numberOfItems, this.state.filterCompleted);
  };


  filterComp = (filter) => {
      let numberOfItems = this.state.numberOfItems
      this.props.loadItems(numberOfItems, filter)
      if (filter === true) {
        this.setState({ filterCompleted: true })
      } else if (filter === false) {
        this.setState({ filterCompleted: false })
      } else {
        this.setState({ filterCompleted: '' })
      }
  }


  pagOnClick = (numberOfItems) => {
    let completed = this.state.filterCompleted
    this.props.loadItems(numberOfItems, completed)
    this.setState({ numberOfItems })
  }

  render() {
    return (
      <div className="pageContentContainer">
        <FilterBar
          totalNumTasks={this.props.totalNumTasks}
          numCompletedTasks={this.props.numCompletedTasks} 
          numUncompletedTasks={this.props.numUncompletedTasks}
          filterComp={this.filterComp}
          filterCompleted={this.state.filterCompleted}
        />
        <div className="taskListing">
          <TaskList
            tasks={this.props.tasks}
            deleteTask={this.props.deleteTask}
            checkTask={this.props.checkTask}
            saveUpdate={this.props.saveUpdate}
          />
        </div>
        <PaginationBar
          numberOfItems={this.state.numberOfItems}
          pagOnClick={this.pagOnClick}
        />
        <AddTask addTask={this.props.addTask} />
      </div>
    );
  }
}
  

export default Home;
