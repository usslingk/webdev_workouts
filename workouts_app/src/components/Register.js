//react basis
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
//Router
import { withRouter } from 'react-router-dom';

class Register extends Component {

  constructor(props){
    super(props);
    this.state={
      female: '',
      male: '',
      name: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    return(
      <div>
        <h1>Registrieren</h1>
        <form>
          <div>
            <label>weiblich</label>
            <input type="radio" name="female" onChange={this.onChange} value={this.state.female} />
            <label>männlich</label>
            <input type="radio" name="male" onChange={this.onChange} value={this.state.male} />
          </div>
          <div>
            <label>Name:</label><br />
            <input type="text" name="name" onChange={this.onChange} value={this.state.name} />
          </div>
          <div>
            <label>E-Mail-Adresse:</label><br />
            <input type="email" name="email" onChange={this.onChange} value={this.state.email} />
          </div>
          <div>
            <label>Passwort:</label><br />
            <input type="password" name="password" onChange={this.onChange} value={this.state.password} />
          </div>
          <button type="submit">Registrieren</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Register);
