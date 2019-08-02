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
      currentUser: []
      // tasks: []

      //   {
      //     id: 1,
      //     title: "Clean up",
      //     completed: false
      //   },
      //   {
      //     id: 2,
      //     title: "Shopping",
      //     completed: false
      //   },
      //   {
      //     id: 3,
      //     title: "Swimming",
      //     completed: false
      //   }
      // ]
    };
  }

  componentDidMount = () => {
    this.props.loadItems();
    console.log('registered user: ', this.props.registeredUser)
    // this.setState({ currentUser: this.props.registeredUser })
  };

  // loadItems = async () => {
  //   let response = await fetch("/api/tasks");
  //   console.log("get-request: ", response);
  //   let json = await response.json();
  //   const loadedTasks = json.tasks;
  //   this.setState({ tasks: loadedTasks }, () =>
  //     console.log("Data loaded from database: ", this.state.tasks)
  //   );
  // };

  // addTask = async title => {
  //   const data = { title };
  //   const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQwMTFhZDlmNjA0OTAyNDhiMGFhNzQiLCJpYXQiOjE1NjQ0Nzk5MTd9.Ndti0jY62R2FOM8YiIekpm1VDcVqfvXocRnGGEnFbmw'
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Authorization": bearer,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   };

  //   let response = await fetch("/api/post-task", options);
  //   console.log("post-request: ", response);
  //   let postedTask = await response.json();

  //   const newTask = {
  //     _id: postedTask._id,
  //     title: postedTask.title,
  //     completed: postedTask.completed
  //   };

  //   this.setState({ tasks: [...this.state.tasks, newTask] }, () => {
  //     console.log("total tasks: ", this.state.tasks);
  //   });
  // };

  // updateTask = async (id, title, completed) => {
  //   const data = { title, completed }

  //   const options = {
  //       method: 'PATCH',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //   }

  //   let response = await fetch('/api/update-task/' + id + '', options)
  //   console.log('patch-request: ', response)
  // }

  // deleteTask = async id => {
  //   const options = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   let response = await fetch("/api/delete-task/" + id + "", options);
  //   console.log("delete-request: ", response);

  //   this.setState({
  //     tasks: [...this.state.tasks.filter(task => task._id !== id)]
  //   });
  // };

  // checkTask = id => {
  //   const taskIndex = this.state.tasks.findIndex(item => item._id === id);

  //   const updTasks = this.state.tasks.map((item, index) => {
  //     if (index !== taskIndex) {
  //       return item;
  //     }

  //     return {
  //       // id: item.id,
  //       // title: item.title,
  //       ...item,
  //       completed: true
  //     };

  //   });

  //   const title = updTasks[taskIndex].title
  //   const completed = updTasks[taskIndex].completed
  //   this.updateTask(id, title, completed)

  //   this.setState({ tasks: updTasks }, () =>
  //     console.log("new tasks after check: ", updTasks)
  //   );
  // };

  // saveUpdate = (id, title, completed) => {
  //   const taskIndex = this.state.tasks.findIndex(item => item._id === id);

  //   const updTasks = this.state.tasks.map((item, index) => {
  //     if (index !== taskIndex) {
  //       return item;
  //     }

  //     return {
  //       ...item,
  //       title,
  //       completed
  //     };
  //   });

  //   this.updateTask(id, title, completed)

  //   this.setState({ tasks: updTasks }, () =>
  //     console.log("new tasks after upd: ", updTasks)
  //   );
  // };

  render() {
    return (
      <div className="App">
        <Header />
        <Greeting
          userName={this.props.registeredUser.user.name}  
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
