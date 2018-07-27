import { GET_SPORTS, FETCH_SPORTS, FETCH_SPORTTAGS } from '../actions/types';

const initialState = {
  items: [], // die von den Actions gesendeten Logins (Alle User?)
  item: {}, // einzlener User der hinzugefügt wird ...
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_SPORTS:
      console.log('reducer sports fetch');
      return{
        ...state,
        items: action.payload
      }
      case FETCH_SPORTTAGS:
      return{
        ...state,
        items: action.payload
      }
    default:
      return state;
  }

}
