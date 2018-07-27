import { FETCH_WORKOUTS, NEW_WORKOUT, DELETE_WORKOUT, UPDATE_WORKOUT, GET_WORKOUT, GET_SPORTS, FETCH_SPORTS, SYNCH_WORKOUT } from './types';
import { request } from 'graphql-request';
import { workoutData } from '../data/WorkoutData';
import axios from 'axios';

//anzeigen alle workouts ...
export const fetchWorkouts = () => dispatch => {
  console.log('fetching Workouts');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `query {allWorkouts {id caloriesOut dateTime max min minutes name}}`
  request (gcEndPoint, gcQuery)
  .then(users => {
    dispatch({
      type: FETCH_WORKOUTS,
      payload: users.allWorkouts
    })
  })
};

//anzeigen alle Sportarten ...
export const fetchSports = () => dispatch => {
  console.log('fetching Sportarten');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `query {allSportartens {id name}}`
  request (gcEndPoint, gcQuery)
  .then(users => {
    dispatch({
      type: FETCH_SPORTS,
      payload: users.allSportartens
    })
  })
};

//getWorkout
export const getWorkout = id => dispatch => {
  console.log('get Workout');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `query getOneWorkout($id: ID!)
  { Workout(id: $id)
  { id caloriesOut dateTime max min minutes name }
  }`
  const gcVariables = {
    "id": id,
  }
  request (gcEndPoint, gcQuery, gcVariables)
  .then(workout => {
    dispatch({
      type: GET_WORKOUT,
      payload: workout.Workout
    })
  })
};

//getsportarten getSports
export const getSports = id => dispatch => {
  console.log('get Sportarten');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `query getSportarten($id: ID!)
  { Sportarten(id: $id)
  { id name workouts{ id min max name minutes dateTime caloriesOut} }
  }`
  const gcVariables = {
    "id": id
  }
  request (gcEndPoint, gcQuery, gcVariables)
  .then(workout => {
    dispatch({
      type: GET_SPORTS,
      payload: workout.Sportarten
    })
  })
};

//funktionierende Variante User zu speichern
export const createWorkout = workoutData => dispatch => {
  console.log('Actioncreator Create Workouts');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `mutation createWorkoutAndConect($caloriesOut: Float!, $dateTime: String!, $max: Int!, $min: Int!, $minutes: Float!, $name: String!, $sportartensIds: [ID!])
  {  createWorkout ( caloriesOut: $caloriesOut, dateTime: $dateTime, max: $max, min: $min, minutes: $minutes, name: $name, sportartensIds: $sportartensIds )
    { id caloriesOut dateTime max min minutes name sportartens { id } }
  }`

  const gcVariables = {
    "caloriesOut": workoutData.caloriesOut,
    "dateTime": workoutData.dateTime,
    "max": workoutData.max,
    "min": workoutData.min,
    "minutes": workoutData.minutes,
    "name": workoutData.name,
    "sportartensIds": workoutData.sportartensIds
  }
  console.log(gcVariables);
  request (gcEndPoint, gcQuery, gcVariables )
  .then(workout => {
    dispatch({
      type: NEW_WORKOUT,
      payload: workout.createWorkout
    })
  })
};

//Update
export const updateWorkout = workoutData => dispatch => {
  console.log('Actioncreator updateWorkouts');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `mutation updateActWorkout($id: ID!, $caloriesOut: Float!, $dateTime: String!, $max: Int!, $min: Int!, $minutes: Float!, $name: String!)
  {  updateWorkout ( id: $id, caloriesOut: $caloriesOut, dateTime: $dateTime, max: $max, min: $min, minutes: $minutes, name: $name )
    { id caloriesOut dateTime max min minutes name }
  }`

  const gcVariables = {
    "id": workoutData.id,
    "caloriesOut": workoutData.caloriesOut,
    "dateTime": workoutData.dateTime,
    "max": workoutData.max,
    "min": workoutData.min,
    "minutes": workoutData.minutes,
    "name": workoutData.name
  }
  request (gcEndPoint, gcQuery, gcVariables )
  .then(workout => {
    dispatch({
      type: UPDATE_WORKOUT,
      payload: workout.updateWorkout
    })
  })
};

//delete
export const deleteWorkout = id => dispatch => {
  console.log('actioncreator deleteWorkout');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `mutation deleteActWorkout($id: ID!)
  {  deleteWorkout ( id: $id )
    { id caloriesOut dateTime max min minutes name }
  }`
  console.log('query deleteWorkout');
  const gcVariables = {
    "id": id
  }
  request (gcEndPoint, gcQuery, gcVariables )
  .then(workout => {
    dispatch({
      type: DELETE_WORKOUT,
      payload: workout.deleteWorkout
    })
  })
};

/*mutation {
 deleteLoginData (id: "cjjuf37u30kxi0181l5s3nvlq" )
    { id gender name email password }
}*/
var response = '';
//Fitbit Request
export const startRequest = workoutData => dispatch => {
  console.log("Actions: startRequest");

  const url = "https://api.fitbit.com/1/user/"+workoutData.user_id+"/activities/heart/date/today/1w.json";

  console.log("startRequest");
  axios.get(
    url,
    {
      headers: {
        "Authorization" : "Bearer "+workoutData.access_token
      }
    }
  )
  .then((response) => {
      response = response.data;
      console.log(response);
    },
    (error) => {
      var status = error.response.status
      console.log(status);
    }
  )

  //JSON mapper      mit dem hier kann man auf ein json zugreifen
  var JM = require('json-mapper');
  var converter = JM.makeConverter({
    val: JM.ch('activities-heart.activities-heart[0].value.hearRateZones[0]', JM.map(function(response){ return response.max; }))
  });
  var result = converter(response);
  console.log(result);



  //eintragen in db
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `mutation ($caloriesOut: Float!, $dateTime: String!, $max: Int!, $min: Int!, $minutes: Float!, $name: String! )
  {  createWorkout ( caloriesOut: $caloriesOut, dateTime: $dateTime, max: $max, min: $min, minutes: $minutes, name: $name )
    { id caloriesOut dateTime max min minutes name }
  }`

  var array = new Array();
  result = array;
  var cal = result[0];

  const gcVariables = {
    "caloriesOut": cal,
    "max": result.max,
    "min": result.min,
    "minutes": result.minutes,
    "name": result.name
  }
  request (gcEndPoint, gcQuery, gcVariables )
  .then(workout => {
    dispatch({
      type: SYNCH_WORKOUT,
      payload: workout.createWorkout
    })
  })
};//end startRequest
