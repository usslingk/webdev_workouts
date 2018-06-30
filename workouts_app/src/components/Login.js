//react basis
import React, { Component } from 'react';
import '../App.css';
//Router
import { withRouter } from 'react-router-dom';

class Login extends Component {

  render(){
    return(
      <div>
        <h1>Login Formular</h1>
      </div>
    )
  }
}

export default withRouter(Login);
