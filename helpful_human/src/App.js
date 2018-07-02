import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import Sidebar from './components/Sidebar.js'
import ViewBody from './components/ViewBody.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Sidebar/>
        <ViewBody/>
      </div>
    );
  }
}

export default App;
