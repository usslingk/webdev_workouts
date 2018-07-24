import { FETCH_WORKOUTS, NEW_WORKOUT, DELETE_WORKOUT, UPDATE_WORKOUT, GET_WORKOUT, GET_SPORTS, FETCH_SPORTS } from './types';
import { request } from 'graphql-request';
import { workoutData } from '../data/WorkoutData';


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
  console.log('Actioncreator Workouts');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `mutation createNewWorkout($caloriesOut: Float!, $dateTime: String!, $max: Int!, $min: Int!, $minutes: Float!, $name: String!)
  {  createWorkout ( caloriesOut: $caloriesOut, dateTime: $dateTime, max: $max, min: $min, minutes: $minutes, name: $name )
    { id caloriesOut dateTime max min minutes name }
  }`

  const gcVariables = {
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
      type: NEW_WORKOUT,
      payload: workout.createcreateWorkout
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
