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
  onSubmit(e){
    e.preventDefault();
    console.log('onSubmit Sports');

    /*const sportArt = {
      id: this.state.id
    };

    this.props.getSports(sportArt);*/
    var input2 = {
      data: {
        name: 'test workout',
        Sportarten: {
          id: 'cjjwxqdfj1p4d0175f7lgtrkz',
          workouts: [
            {
              name: 'test neu',
              min: 123,
              dateTime: '2018-07-15',
              caloriesOut: 1250,
              minutes: 50,
              id: 'cjjvn1pz90mpi0147nat0nd4o',
              max: 123
            },
            {
              name: 'Test Reload',
              min: 60,
              dateTime: '2018-07-16',
              caloriesOut: 500,
              minutes: 400,
              id: 'cjjvn33820mon0104lcwjnlb9',
              max: 125
            }
          ]
      }
    }
  }
  var input = {
    user: {
        name: 'John',
        nick: 'C00lHacker'
      }
    };

  var JM = require('json-mapper');

  var converter = JM.makeConverter({
    val: JM.ch('data.Sportarten.workouts', JM.map(function(input2){ return input2.name }))
  });

  var result = converter(input2);

  console.log(result);
}

  render(){
    const sportItems = this.props.sports.map(sportart => (
      <div key={sportart.id}>
        <button onClick = {(e) => {
          e.preventDefault();
          this.props.getSports(sportart.id);
        }}>{sportart.name}</button>
      </div>
    ));

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
        <h3>Sportart auswählen:</h3>
        { sportItems }
        <form onSubmit={this.onSubmit} className="register">
        <button type="submit">Eintragen</button>
        </form>
        { workoutItems }
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
