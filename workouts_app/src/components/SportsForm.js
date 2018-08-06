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
import { deleteWorkout } from '../actions/workoutActions';

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
        <h3 className="workouthead">{workout.dateTime}</h3>
        <p>{workout.name}</p>
        <p>Maximaler Puls: {workout.max} </p>
        <p> Minimaler Puls: {workout.min} </p>
        <p>Zeit: {workout.minutes} Minuten</p>
        <p>Super, du hast {workout.caloriesOut} Kalorien verbrannt!</p>
        <button onClick={(e) => {
          e.preventDefault();
          this.props.deleteWorkout(workout.id);
          window.location.reload();
        }} className="löschenbtn">Workout Löschen</button><button className="bearbeitenbtn"><Link to={`/workout/${workout.id}`} className="bearbeiten"> Workout Bearbeiten</Link></button>
        <br /><br /><br />
      </div>
    ));

    return(
      <div>
      <div class="card text-center" data-tabs="myTabPage">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
    <li class="nav-item"><Link class="nav-link" to={"/home"} data-tab-page="page1">Workouts</Link></li>
    <li class="nav-item"><Link class="nav-link" to={"/workoutform"} data-tab-page="page2">Add Workout</Link></li>
    <li class="nav-item"><Link class="nav-link tabbackground" to={"/sports"} data-tab-page="page3">List Workout by category</Link></li>
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
  workouts: PropTypes.array.isRequired,
  deletedWorkout: PropTypes.object,
  updatedWorkout: PropTypes.object,
  };

const mapStateToProps = state => ({
  sports: state.sports.items, //index.js (2.workouts)
  workouts: state.workouts.items,
  updatedWorkout: state.workouts.item,
  deletedWorkout: state.workouts.item
})

export default withRouter ( connect (mapStateToProps, { fetchSports, getSports, deleteWorkout })(SportsForm))
