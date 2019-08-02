import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Start from './components/Start';
import Home from './components/Home'
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Error from './components/Error';
import Navigation from './components/Navigation';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      registeredUser: {},
      errors: [],
      succReg: false
    }
  }


  registerUser = async (name, email, password) => {
    const data = {name, email, password}

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  
    let response = await fetch("/users", options);
    console.log("post-request: ", response);
    let registeredUser = await response.json();
    console.log('registeredUser: ', registeredUser)

    // If an error occured, create an array with all error messages, and save it in error state
    if (registeredUser.errors !== undefined) {
      let errors = registeredUser.errors
      let errorMessages = Object.values(errors)
      let errorMessagesArr = []
      for (let i = 0; i < errorMessages.length; i++) {
        errorMessagesArr.push({id: i, error: errorMessages[i].message})
      }
      this.setState({ errors: errorMessagesArr })
    
      // if an error occured because the email was already registered, create an array with the error message and save it in error state
    } else if (registeredUser.code !== undefined) {
      let errorMessageDup = [{id: 0, error: 'Email already registered'}]
      this.setState({ errors: errorMessageDup, succReg: false })
      
      // if no error occured, save user in state and save flag that registration was succesfull in state
    } else {
        this.setState({ registeredUser, errors: [], succReg: true });
      }
  };

  loginUser = async (email, password) => {
    const data = {email, password}

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  
    let response = await fetch("/users/login", options);
    console.log("post-request: ", response);
    let login = await response.json();

    // If email or password are not entered correctly an error occures, which is saved in error state
    if (login === "Unable to login") {
      let errorMessagesArr = [{id: 0, error: 'Unable to login'}]
      this.setState({ errors: errorMessagesArr, succReg: false })
      
      // if no error occured, save user in state and save flag that registration/login was succesfull in state
    } else {
        this.setState({ registeredUser: login, errors: [], succReg: true });
      }
  };


  logoutUser = async () => {
    const bearer = 'Bearer ' + this.state.registeredUser.token
    const options = {
      method: "POST",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    };

    let response = await fetch("/users/logout", options);
    console.log("post-request: ", response);
    // let logout = await response.json();
    // console.log('logout: ', logout)
  }


  loadItems = async () => {
    const bearer = 'Bearer ' + this.state.registeredUser.token
    const options = {
      method: "GET",
      headers: {
        "Authorization": bearer,
        // "Content-Type": "application/json"
      }
    };

    let response = await fetch("/tasks", options);
    console.log("get-request: ", response);
    let json = await response.json();
    const loadedTasks = json;
    this.setState({ tasks: loadedTasks }, () =>
      console.log("Data loaded from database: ", this.state.tasks)
    );
  };


  addTask = async title => {
    const data = { title };
    const bearer = 'Bearer ' + this.state.registeredUser.token
    const options = {
      method: "POST",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    let response = await fetch("/api/post-task", options);
    console.log("post-request: ", response);
    let postedTask = await response.json();

    const newTask = {
      _id: postedTask._id,
      title: postedTask.title,
      completed: postedTask.completed,
      owner: this.state.registeredUser.user._id
    };

    this.setState({ tasks: [...this.state.tasks, newTask] }, () => {
      console.log("total tasks: ", this.state.tasks);
    });
  };


  updateTask = async (id, title, completed) => {
    const data = { title, completed }
    const bearer = 'Bearer ' + this.state.registeredUser.token

    const options = {
      method: 'PATCH',
      headers: {
        "Authorization": bearer,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    let response = await fetch('/api/update-task/' + id + '', options)
    console.log('patch-request: ', response)
  }

  checkTask = id => {
      const taskIndex = this.state.tasks.findIndex(item => item._id === id);
  
      const updTasks = this.state.tasks.map((item, index) => {
        if (index !== taskIndex) {
          return item;
        }
  
        return {
          // id: item.id,
          // title: item.title,
          ...item,
          completed: true
        };
      });
  
      const title = updTasks[taskIndex].title
      const completed = updTasks[taskIndex].completed
      this.updateTask(id, title, completed)
  
      this.setState({ tasks: updTasks }, () =>
        console.log("new tasks after check: ", updTasks)
      );
    };

  saveUpdate = (id, title, completed) => {
    const taskIndex = this.state.tasks.findIndex(item => item._id === id);
  
    const updTasks = this.state.tasks.map((item, index) => {
      if (index !== taskIndex) {
        return item;
      }
  
      return {
        ...item,
        title,
        completed
      };
    });
  
    this.updateTask(id, title, completed)
  
    this.setState({ tasks: updTasks }, () =>
      console.log("new tasks after upd: ", updTasks)
    );
  };


  deleteTask = async id => {
    const bearer = 'Bearer ' + this.state.registeredUser.token
    const options = {
      method: "DELETE",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    };

    let response = await fetch("/api/delete-task/" + id + "", options);
    console.log("delete-request: ", response);

    this.setState({
      tasks: [...this.state.tasks.filter(task => task._id !== id)]
    });
  };

  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Start} exact />          
            <Route path="/home"
              render={(routeProps) => (<Home {...routeProps} 
                loadItems={this.loadItems}
                tasks={this.state.tasks}
                addTask={this.addTask}
                updateTask={this.updateTask}
                checkTask={this.checkTask}
                saveUpdate={this.saveUpdate}
                deleteTask={this.deleteTask}
                registeredUser={this.state.registeredUser}
                />)} 
              // component={Home} 
            />
            <Route path="/profile" component={Profile} />
            <Route path="/signup"
              render={(routeProps) => (<Signup {...routeProps} 
                registerUser={this.registerUser}
                errors={this.state.errors}
                succReg={this.state.succReg}
                />)}
              // component={Signup} 
              />
            <Route path="/login" 
              render={(routeProps) => (<Login {...routeProps} 
                loginUser={this.loginUser}
                errors={this.state.errors}
                succReg={this.state.succReg}
                />)}
            // component={Login} 
            />
            <Route path="/logout" 
              render={(routeProps) => (<Logout {...routeProps} 
                logoutUser={this.logoutUser}
                />)}
            // component={Logout} 
            />
            <Route component={Error} />                        
          </Switch>
        </div>
      </BrowserRouter>      
    );
  }
}
  

export default App;
