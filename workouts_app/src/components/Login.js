//react basis
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//Component
import { authenticateUserData } from '../actions/loginActions';

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

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
            <br />
            <br />
            <Link to={`/register`}> Noch kein Mitglied? Jetzt registrieren! </Link>
          </form>
      </div>
    )
  }
}

export default withRouter(Login);
