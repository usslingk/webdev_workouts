//react basis
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
//Router
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);

  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    return(
      <div>
        <h1>Login</h1>
          <form onSubmit={this.onSubmit} className="register">
            <div>
              <label>E-Mail:</label> <br />
              <input type="email" name="email" onChange={this.onChange} value={this.state.email}/>
            </div>
            <br />
            <div>
              <label>Passwort: </label> <br />
              <input type="password" name="password" onChange={this.onChange} value={this.state.password}/>
            </div>
            <br />
            <Link to={`/home`}> Login </Link>
          </form>
      </div>
    )
  }
}

export default withRouter(Login);
