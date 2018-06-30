//react basis
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
//Component
import { createUser } from '../actions/loginActions';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      gender: '',
      name: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      gender: this.state.gender,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.createUser(user);
  }

  render(){
    return(
      <div>
        <h1>Registrieren</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>weiblich</label>
            <input type="radio" name="gender" onChange={this.onChange} value={"female"} />
            <label>männlich</label>
            <input type="radio" name="gender" onChange={this.onChange} value={"male"} />
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

Register.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withRouter(connect(null, { createUser })(Register));
