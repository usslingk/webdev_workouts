//React Basis
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//Actions
import { fetchWorkouts, deleteWorkout, startRequest } from '../actions/workoutActions';
import { fetchSportTags } from '../actions/sportsActions'

class Workouts extends Component {
  constructor(props){
    super(props);
    this.state = {
      access_token: '',
      user_id: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    console.log('componentWillMount fetchWorkouts');
    this.props.fetchWorkouts();

  }

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

onSubmit(e){
  e.preventDefault();

  const queryString = require('query-string');
  const parsedHash = queryString.parse(window.location.hash);
  console.log(parsedHash);

  this.props.startRequest(parsedHash);
}

  render(){
    /*const sportItems = this.props.sports.map(sport =>(
      <div key={sport.id}>
      <p> # {sport.name}</p>
      </div>
    ))*/
    const workoutItems = this.props.workouts.map(workout => (
      <div key={workout.id}>

        <h3 className="workouthead">{workout.dateTime}</h3>
        <p>{workout.name}</p>
        <p>Maximaler Puls: {workout.max}</p>
        <p>Minimaler Puls: {workout.min}</p>
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
    <li class="nav-item"><Link class="nav-link tabbackground" to={"/home"} data-tab-page="page1">Workouts</Link></li>
    <li class="nav-item"><Link class="nav-link" to={"/workoutform"} data-tab-page="page2">Add Workout</Link></li>
    <li class="nav-item"><Link class="nav-link" to={"/sports"} data-tab-page="page3">List Workout by category</Link></li>
    <a href="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22D3SJ&redirect_uri=http%3A%2F%2Fomb.katharina-ussling.de%2Fhome&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">1. Schritt: Authorisieren</a>
        <form name="formHome"  onSubmit={this.onSubmit}>
          <button type="submit" className="löschenbtn">2. Schritt: start request</button>
        </form>
    </ul>
  </div>
  <div class="card-block" data-tab-page="page1">
  <br />
  <br />
    <h4 class="card-title workoutheadline">Hier sind deine bisherigen Workouts</h4>
    <br />
    { workoutItems }
    <br />
  </div>
</div>
      </div>
    )
  }
}

Workouts.propTypes = {
  fetchWorkouts: PropTypes.func.isRequired,
  fetchSportTags: PropTypes.func.isRequired,
  startRequest: PropTypes.func.isRequired,
  workouts: PropTypes.array.isRequired,
  sports: PropTypes.array.isRequired,
  newWorkout: PropTypes.object,
  updatedWorkout: PropTypes.object,
  deletedWorkout: PropTypes.object
};

const mapStateToProps = state => ({
  workouts: state.workouts.items, //index.js (2.workouts)
  newWorkout: state.workouts.item,
  updatedWorkout: state.workouts.item,
  deletedWorkout: state.workouts.item,
  sports: state.sports.items,
})

export default withRouter ( connect (mapStateToProps, { fetchWorkouts, deleteWorkout, fetchSportTags, startRequest })(Workouts))
