import { FETCH_USERNAME, NEW_USER} from '../actions/types';

const initialState = {
  items: [], // die von den Actions gesendeten Logins (Alle User?)
  item: {}, // einzlener User der hinzugefügt wird
}

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
