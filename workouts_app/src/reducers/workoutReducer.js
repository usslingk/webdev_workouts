import { FETCH_WORKOUTS, NEW_WORKOUT, DELETE_WORKOUT, UPDATE_WORKOUT, GET_WORKOUT } from '../actions/types';

const initialState = {
  items: [], // die von den Actions gesendeten Logins (Alle User?)
  item: {}, // einzlener User der hinzugefügt wird ...
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_WORKOUTS:
      console.log('reducer_workouts_fetch');
      return{
        ...state,
        items: action.payload
      }
    case GET_WORKOUT:
      console.log('reducer_workouts_get');
      return{
        ...state,
        item: action.payload
      }
    case NEW_WORKOUT:
    console.log('reducer_workouts_new');
      return {
        ...state,
        item: action.payload
      }
    case UPDATE_WORKOUT:
    console.log('reducer_workouts_update');
      return{
        ...state,
        item: action.payload
      }
    case DELETE_WORKOUT:
    console.log('reducer_workouts_delete');
      return{
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}
