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
      user: {},
      token: '',
      errors: [],
    }
  }

  /* ---------------------------------------------------------------------- */
  /* methods regarding user */

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
    // console.log('registeredUser: ', registeredUser)

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
      this.setState({ errors: errorMessageDup })
      
      // if no error occured, save user in state and save flag that registration was succesfull in state
    } else {
        this.setState({ user: registeredUser.user, token: registeredUser.token, errors: [] });
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
      this.setState({ errors: errorMessagesArr })
      
      // if no error occured, save user in state and save flag that registration/login was succesfull in state
    } else {
        this.setState({ user: login.user, token: login.token, errors: [] });
      }
  };


  logoutUser = async () => {
    const bearer = 'Bearer ' + this.state.token
    const options = {
      method: "POST",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    };

    let response = await fetch("/users/logout", options);
    console.log("post-request: ", response);
    let logout = await response.json();
    // console.log('logout: ', logout)
    this.setState({ user: logout, token: '' });
  }

  //currently not needed, user data is loaded, when 'Home' is loaded

  // showProfile = async () => {
  //   const bearer = 'Bearer ' + this.state.token
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Authorization": bearer,
  //       // "Content-Type": "application/json"
  //     }
  //   };

  //   let response = await fetch("/users/me", options);
  //   console.log("get-request: ", response);
  //   let userProfile = await response.json();
  //   this.setState({ userProfile }, () => {console.log('user profile: ', userProfile, 'user: ', this.state.user)})
  // }

  updatePassword = async (email, oldPassword, password) => {
    const data = {email, oldPassword, password}
    
    const bearer = 'Bearer ' + this.state.token
    const options = {
      method: "PATCH",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    let response = await fetch("/users/me/password", options);
    console.log("patch-request: ", response);
    let updatePassword = await response.json();
    // console.log('user: ', updatePassword)

    // If an error occured save it in error state
    if (updatePassword === 'Unable to change password') {
      let errors = [{id: 0, error: 'Unable to change password'}]
      this.setState({ errors: errors })
    } else if (updatePassword === 'User validation failed: password: Password must have more than six characters!') {
      let errors = [{id: 0, error: 'Password must have more than six characters!'}]
      this.setState({ errors: errors })
    } else {
      this.setState({ errors: [] });
    }
  }

  updateProfile = async (name, email) => {
    const data = {name, email}
    
    const bearer = 'Bearer ' + this.state.token
    const options = {
      method: "PATCH",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    let response = await fetch("/users/me/profile", options);
    console.log("patch-request: ", response);
    let updateProfile = await response.json();
    // console.log('profile: ', updateProfile)
    // console.log('this.state.user: ', this.state.user)

    this.setState({ user: updateProfile}, () => console.log('updated user state: ', this.state.user))
    // version to use spread-operator and 'name' and 'email' properties that are coming from 'ProfileUpdateForm'-component
    // this.setState({ user: { ...this.state.user, name, email }}, () => console.log('updated user state: ', this.state.user))


    // // If an error occured save it in error state
    // if (updatePassword === 'Unable to change password') {
    //   let errors = [{id: 0, error: 'Unable to change password'}]
    //   this.setState({ errors: errors })
    // } else if (updatePassword === 'User validation failed: password: Password must have more than six characters!') {
    //   let errors = [{id: 0, error: 'Password must have more than six characters!'}]
    //   this.setState({ errors: errors })
    // } else {
    //   this.setState({ errors: [] });
    // }
  }

  cancelSignLog = () => {
    this.setState({ errors: [] });
  }
  
  cancelPasswordUpdate = () => {
    this.setState({ errors: [] });
  }

  /* ----------------------------------------------------- */


  /* ----------------------------------------------------- */
  /* methods regarding tasks */

  loadItems = async (numberOfItems) => {
    const url = '/tasks?limit=' + numberOfItems + ''
    const bearer = 'Bearer ' + this.state.token
    const options = {
      method: "GET",
      headers: {
        "Authorization": bearer,
        // "Content-Type": "application/json"
      }
    };

    // let response = await fetch("/tasks", options);
    let response = await fetch(url, options);

    console.log("get-request: ", response);
    let json = await response.json();
    const loadedTasks = json;
    this.setState({ tasks: loadedTasks }, () =>
      console.log("Data loaded from database: ", this.state.tasks)
    );
  };


  addTask = async title => {
    const data = { title };
    const bearer = 'Bearer ' + this.state.token
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
      owner: this.state.user._id
    };

    this.setState({ tasks: [...this.state.tasks, newTask] }, () => {
      console.log("total tasks: ", this.state.tasks);
    });
  };


  updateTask = async (id, title, completed) => {
    const data = { title, completed }
    const bearer = 'Bearer ' + this.state.token

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
    const bearer = 'Bearer ' + this.state.token
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

  /* ----------------------------------------------------- */

  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation
            token={this.state.token}                
          />
          <Switch>
            <Route path="/" 
              exact
              render={(routeProps) => (<Start {...routeProps} 
                />)} 
            // component={Start}  
            />          
            <Route path="/home"
              render={(routeProps) => (<Home {...routeProps} 
                loadItems={this.loadItems}
                tasks={this.state.tasks}
                addTask={this.addTask}
                updateTask={this.updateTask}
                checkTask={this.checkTask}
                saveUpdate={this.saveUpdate}
                deleteTask={this.deleteTask}
                user={this.state.user}
                />)} 
              // component={Home} 
            />
            <Route path="/profile" 
              render={(routeProps) => (<Profile {...routeProps} 
                // showProfile={this.showProfile}
                user={this.state.user}
                updateProfile={this.updateProfile}
                updatePassword={this.updatePassword}
                errors={this.state.errors}
                cancelPasswordUpdate={this.cancelPasswordUpdate}
                />)}
            // component={Profile} 
            />
            <Route path="/signup"
              render={(routeProps) => (<Signup {...routeProps} 
                registerUser={this.registerUser}
                token={this.state.token}                
                errors={this.state.errors}
                cancelSignLog={this.cancelSignLog}
                />)}
              // component={Signup} 
              />
            <Route path="/login" 
              render={(routeProps) => (<Login {...routeProps} 
                loginUser={this.loginUser}
                token={this.state.token}                
                errors={this.state.errors}
                cancelSignLog={this.cancelSignLog}
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
