//React Basis
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//Actions
import { fetchWorkouts, deleteWorkout } from '../actions/workoutActions';

class SportsResults extends Component {
  //componentWillMount(){
    //console.log('componentWillMount fetchWorkouts');
    //this.props.fetchWorkouts();
  //}

  componentWillReceiveProps(nextProps){
    if(nextProps.newWorkout){
      this.props.workouts.push(nextProps.newWorkout);
    }
    if(nextProps.updatedWorkout){
      this.props.workouts.push(nextProps.updatedWorkout);
    }
    if(nextProps.deletedWorkout){
      var array = this.props.workouts;
      console.log(array[0]);
      this.props.workouts.splice(nextProps.deletedWorkout);
    }
  }


  render(){
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
        <h3>Hier sind deine ausgewählten Workouts</h3>
        { workoutItems }
      </div>
    )
  }
}

SportsResults.propTypes = {
  fetchWorkouts: PropTypes.func.isRequired,
  workouts: PropTypes.array.isRequired,
  newWorkout: PropTypes.object,
  updatedWorkout: PropTypes.object,
  deletedWorkout: PropTypes.object
};

const mapStateToProps = state => ({
  workouts: state.workouts.items, //index.js (2.workouts)
  newWorkout: state.workouts.item,
  updatedWorkout: state.workouts.item,
  deletedWorkout: state.workouts.item
})

export default withRouter ( connect (mapStateToProps, { fetchWorkouts, deleteWorkout })(SportsResults))
