import { GET_SPORTS, FETCH_SPORTS } from './types';
import { request } from 'graphql-request';


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

//getsportarten getSports
export const getSports = id => dispatch => {
  console.log('get Sportarten');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `query getSportarten($id: ID!)
  { allWorkouts (filter:{sportartens_some: {id: $id}})
  { id min max name minutes dateTime caloriesOut sportartens {id}}
  }`
  const gcVariables = {
    "id": id
  }
  request (gcEndPoint, gcQuery, gcVariables)
  .then(workout => {
    dispatch({
      type: GET_SPORTS,
      payload: workout.allWorkouts
    })
  })
};
