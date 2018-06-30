//react basis
import React, { Component } from 'react';
import '../App.css';
//Router
import { withRouter } from 'react-router-dom';

class Home extends Component {
  render(){
    return(
      <h1>Home</h1>
    )
  }
}

export default withRouter(Home);
