//react basis
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import store from './store';
//router
import { BrowserRouter as Router, Route } from 'react-router-dom';
//components
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Workoutform from './components/Workoutform';
import Users from './components/Users';
import UpdateWorkout from './components/UpdateWorkout';

const Header = () => {
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={'/'}>
          <div className="App"> {/*richtig das zweimal className="App"?*/}
            <Route path="/" component={Header} />
            <Route path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/home" component={Workoutform} />
            <Route path="/workout/:workoutid" component={UpdateWorkout} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
