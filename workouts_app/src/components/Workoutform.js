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
      <div class="card text-center" data-tabs="myTabPage">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item"><a class="nav-link" href="/home" data-tab-page="page1">Workouts</a></li>
      <li class="nav-item"><a class="nav-link" href="/workoutform" data-tab-page="page2">Add Workout</a></li>
      <li class="nav-item"><a class="nav-link" href="/sports" data-tab-page="page3">List Workout by category</a></li>
    </ul>
  </div>
  <div class="card-block" data-tab-page="page2">
  <br />
    <h4 class="card-title">Workout manuell eintragen</h4>
    <form onSubmit={this.onSubmit}>
      <div className="formularfeld">
        <br />
        <input type="text" name="dateTime" onChange={this.onChange} value={this.state.dateTime} placeholder="Datum" />
      </div>
      <div className="formularfeld">
        <br />
        <input type="text" name="name" onChange={this.onChange} value={this.state.name} placeholder="Name" />
      </div>
      <div className="formularfeld">
        <br />
        <input type="number" name="max" onChange={this.onChange} value={this.state.max} placeholder="Maximaler Puls" />
      </div>
      <div className="formularfeld">
        <br />
        <input type="number" name="min" onChange={this.onChange} value={this.state.min} placeholder="Minimaler Puls" />
      </div>
      <div className="formularfeld">
        <br />
        <input type="number" name="minutes" onChange={this.onChange} value={this.state.minutes} placeholder="Zeit"/>
      </div>
      <div className="formularfeld">
      <br />
        <input type="number" name="caloriesOut" onChange={this.onChange} value={this.state.caloriesOut} placeholder="Verbrannte Kalorien" />
      </div>
      <br />
      <label className="checkbox">
           <input type="checkbox" name="art" value="aufwaermen" />
           Aufwärmen
        </label>
        <br />
        <label className="checkbox">
           <input type="checkbox" name="art1" value="dehnen" />
           Dehnen
        </label>
        <br />
        <input type="file" id="bild" name="bild" accept="image/png, image/jpeg, image/jpg" />
        <br />
      <button type="submit" className="eintragen">Eintragen</button>
    </form>
  </div>

</div>

      </div>
    )
  }
}

Workoutform.propTypes = {
  createWorkout: PropTypes.func.isRequired
};

export default withRouter(connect(null, { createWorkout })(Workoutform));
