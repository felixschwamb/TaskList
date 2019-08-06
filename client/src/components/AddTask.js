import React, { Component } from 'react'

export class AddTask extends Component {

    constructor() {
        super()
        this.state = {
          title: ''
        }
      }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addTask(this.state.title)
        this.setState({ title: '' })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
            // title: e.target.value
    })}

    render() {
        return (
          <div className="addForm">
            <form onSubmit={this.onSubmit}>
              <label className="label-header">Add new task: </label>
              <br />
              <div className="inpButContainer">
                <input
                  type="text"
                  name="title"
                  placeholder="New task"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <button id="submit">Add</button>
              </div>
            </form>
          </div>
        );
    }
}

export default AddTask
