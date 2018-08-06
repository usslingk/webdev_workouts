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
import { loginUser } from '../actions/loginActions';

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

  componentWillReceiveProps(nextProps){
    if(nextProps.userLogin){
      console.log('antwort erhalten');
    window.location.assign("/home")
  }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };


    this.props.loginUser(user);
    console.log('loginUser ausgeführt');
    //his.props.history.push("/home");


  }


  render(){
    return(
      <div>

  <div class="card" >
      <div class="card-body">
        <h1 class="card-title">Login</h1>
        <br />
          <form onSubmit={this.onSubmit} className="register">
            <div>
              <input type="email" name="email" onChange={this.onChange} value={this.state.email} placeholder="E-Mail"/>
            </div>
            <br />
            <div>
              <input type="password" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password"/>
            </div>
            <br />
            <button type="submit" className="loginbtn">Login</button>
            <br />
            <br />
            <br />
            <Link to={`/register`} className="km"> Noch kein Mitglied? Jetzt registrieren! </Link>
            <br /><br />
          </form>
      </div>
</div>

      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  userLogin: PropTypes.object
};

const mapStateToProps = state => ({
  userLogin: state.logins.item
})

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
