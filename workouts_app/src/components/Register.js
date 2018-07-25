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
      <div class="card" >
          <div class="card-body">
            <h1 class="card-title">Register</h1>
            <br />
        <form onSubmit={this.onSubmit}>
          <div>

            <input type="radio" name="gender" onChange={this.onChange} value={"female"} className="radio"/>
            <label> weiblich</label>
            <input type="radio" name="gender" onChange={this.onChange} value={"male"} className="radio"/>
            <label> männlich</label>
          </div>
          <div>
          <br />
            <input type="text" name="name" onChange={this.onChange} value={this.state.name} placeholder="Name"/>
          </div>
          <div>
          <br />
            <input type="email" name="email" onChange={this.onChange} value={this.state.email} placeholder="E-Mail"/>
          </div>
          <div>
          <br />
            <input type="password" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password"/>
          </div>
          <br />
          <button type="submit" className="loginbtn">Registrieren</button>
        </form>
        </div>
  </div>
      </div>
    )
  }
}

Register.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withRouter(connect(null, { createUser })(Register));
