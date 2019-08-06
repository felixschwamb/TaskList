import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import TaskList from './TaskList';
import PaginationBar from './PaginationBar';
import AddTask from './AddTask';
import '../App.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfItems: 5
    };
  }

  componentDidMount = () => {
    this.props.loadItems(this.state.numberOfItems);
  };

  pagOnClick = (numberOfItems) => {
    this.props.loadItems(numberOfItems)
    this.setState({ numberOfItems })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Greeting
          userName={this.props.user.name}  
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
