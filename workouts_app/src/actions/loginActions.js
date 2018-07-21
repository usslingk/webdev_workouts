import { FETCH_USERNAME, NEW_USER, DELETE_USER } from './types';
import { request } from 'graphql-request';
import { userData } from '../data/UserData';


//anzeigen alle user ...
export const fetchUser = () => dispatch => {
  console.log('fetching');
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `query {allLoginDatas {id email gender name password}}`
  request (gcEndPoint, gcQuery)
  .then(users => {
    dispatch({
      type: FETCH_USERNAME,
      payload: users.allLoginDatas
    })
  })
};

//funktionierende Variante User zu speichern
export const createUser = userData => dispatch => {
  const gcEndPoint = `https://api.graph.cool/simple/v1/cjj1c5a8a13j50107quv7cl2v`
  const gcQuery = `mutation createAccount($gender: String!, $name: String!, $email: String!, $password: String!)
  {  createLoginData ( gender: $gender, name: $name, email: $email, password: $password )
    { id gender name email password }
  }`

  const gcVariables = {
    "gender": userData.gender,
    "name": userData.name,
    "email": userData.email,
    "password": userData.password
  }
  request (gcEndPoint, gcQuery, gcVariables )
  .then(user => {
    dispatch({
      type: NEW_USER,
      payload: user.createLoginData
    })
  })
};



/*mutation {
 deleteLoginData (id: "cjjuf37u30kxi0181l5s3nvlq" )
    { id gender name email password }
}*/
