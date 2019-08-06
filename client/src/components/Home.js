import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import TaskList from './TaskList';
import AddTask from './AddTask';
import '../App.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount = () => {
    this.props.loadItems();
  };

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
        <AddTask addTask={this.props.addTask} />
      </div>
    );
  }
}
  

export default Home;
