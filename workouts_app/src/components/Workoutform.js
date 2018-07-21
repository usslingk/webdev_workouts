//react basis
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
//Component
import { createWorkout } from '../actions/workoutActions';

class Workoutform extends Component {

  constructor(props){
    super(props);
    this.state = {
      dateTime: '',
      name: '',
      max: '',
      min: '',
      minutes: '',
      caloriesOut: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    var ma = parseInt(this.state.max);
    var mi = parseInt(this.state.min);
    var minu = parseInt(this.state.minutes);
    var calories = parseInt(this.state.caloriesOut);

    const workout = {
      dateTime: this.state.dateTime,
      name: this.state.name,
      max: ma,
      min: mi,
      minutes: minu,
      caloriesOut: calories,
    };

    this.props.createWorkout(workout);
    window.location.reload();
  }

  render(){
    return(
      <div>
        <h3>Workout manuell eintragen</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Datum:</label><br />
            <input type="text" name="dateTime" onChange={this.onChange} value={this.state.dateTime} />
          </div>
          <div>
            <label>Name:</label><br />
            <input type="text" name="name" onChange={this.onChange} value={this.state.name} />
          </div>
          <div>
            <label>Maximaler Puls:</label><br />
            <input type="number" name="max" onChange={this.onChange} value={this.state.max} />
          </div>
          <div>
            <label>Minimaler Puls:</label><br />
            <input type="number" name="min" onChange={this.onChange} value={this.state.min} />
          </div>
          <div>
            <label>Zeit:</label><br />
            <input type="number" name="minutes" onChange={this.onChange} value={this.state.minutes} />
          </div>
          <div>
            <label>Verbrannte Kalorien:</label><br />
            <input type="number" name="caloriesOut" onChange={this.onChange} value={this.state.caloriesOut} />
          </div>
          <button type="submit">Eintragen</button>
        </form>
      </div>
    )
  }
}

Workoutform.propTypes = {
  createWorkout: PropTypes.func.isRequired
};

export default withRouter(connect(null, { createWorkout })(Workoutform));
