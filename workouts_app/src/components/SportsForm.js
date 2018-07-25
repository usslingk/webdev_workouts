//React Basis
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//Actions
import { fetchSports, getSports } from '../actions/sportsActions';

class SportsForm extends Component {
  componentWillMount(){
    console.log('componentWillMount fetchSports');
    this.props.fetchSports();
  }

  /*componentWillReceiveProps(nextProps){
    if(nextProps.newWorkout){
      this.props.sports.push(nextProps.newWorkout);
    }
  }*/

  render(){
    console.log('Ergebnis Sportarten'+this.props.sports);
    const sportItems = this.props.sports.map(sportart => (
      <div key={sportart.id}>
        <button onClick = {(e) => {
          e.preventDefault();
          this.props.getSports(sportart.id);
        }} className="sportbtn">{sportart.name}</button>
        <br /><br />
      </div>
    ));

    console.log('Ergebnis Workouts'+this.props.workouts);
    const workoutItems = this.props.workouts.map(workout => (
      <div key={workout.id}>
        <h3>{workout.dateTime}</h3>
        <p>{workout.name}: Maximaler Puls={workout.max} + Minimaler Puls={workout.min} </p>
        <p>Zeit: {workout.minutes} Minuten | Super, du hast {workout.caloriesOut} Kalorien verbrannt!</p>
        <button onClick={(e) => {
          e.preventDefault();
          this.props.deleteWorkout(workout.id);
        }}>Workout Löschen</button><Link to={`/workout/${workout.id}`} > Workout Bearbeiten</Link>
      </div>
    ));

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
  <div class="card-block" data-tab-page="page3">
  <br />

    <h4 class="card-title">Sportart auswählen:</h4>
    { sportItems }
    <br />
    { workoutItems }
  </div>
</div>

      </div>
    )
  }
}

SportsForm.propTypes = {
  fetchSports: PropTypes.func.isRequired,
  getSports: PropTypes.func.isRequired,
  sports: PropTypes.array.isRequired,
  workouts: PropTypes.array.isRequired
  };

const mapStateToProps = state => ({
  sports: state.sports.items, //index.js (2.workouts)
  workouts: state.workouts.items
})

export default withRouter ( connect (mapStateToProps, { fetchSports, getSports })(SportsForm))
