import React, { Component } from 'react'
import './App.css';
import Nav from './Components/nav/Nav';

export class App extends Component {
  state = {
    open: true,
    message: ''
  }

  render() {
    return (
      <div className='App'>
        <Nav>
        </Nav>
        <h1>Home</h1>
        {this.props.location.state !== undefined ?
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{this.props.location.state.message}</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}
        {this.state.message ? <div>{this.state.message}</div> : null}
      </div>
    )
  }
}

export default App