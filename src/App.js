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
        
      </div>
    )
  }
}

export default App