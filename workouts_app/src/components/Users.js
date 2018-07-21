//React Basis
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//Actions
import { fetchUser } from '../actions/loginActions';

class Users extends Component {
  componentWillMount(){
    console.log(123);
    this.props.fetchUser();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.newUser){
      this.props.users.push(nextProps.newUser);
    }
  }

  deleteU(e){
    e.preventDefault();

    const userId = {
      id: this.state.id
    };

    this.props.deleteUser(userId);
  }

  render(){
    const userItems = this.props.users.map(user => (
      <div key={user.id}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.gender}</p>
        <p>{user.password}</p>
        <Link to={`/`} onClick={user.deleteU}>User Löschen</Link>
      </div>
    ));

    return(
      <div>
        <h1>User</h1>
        { userItems }
      </div>
    )
  }
}

Users.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  newUser: PropTypes.object
};

const mapStateToProps = state => ({
  users: state.logins.items, //index.js
  newUser: state.logins.item
})

export default withRouter ( connect (mapStateToProps, { fetchUser })(Users))
