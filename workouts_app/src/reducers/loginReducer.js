import { FETCH_USERNAME, NEW_USER, DELETE_USER } from '../actions/types';

const initialState = {
  items: [], // die von den Actions gesendeten Logins (Alle User?)
  item: {}, // einzlener User der hinzugefügt wird ...
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USERNAME:
      console.log('reducer_fetch');
      return{
        ...state,
        items: action.payload
      }
    case NEW_USER:
    console.log('reducer_new');
      return {
        ...state,
        item: action.payload
      }
    case DELETE_USER:
    console.log('reducer_delete');
      return{
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}
