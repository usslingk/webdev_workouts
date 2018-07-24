import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import workoutReducer from './workoutReducer';
import sportsReducer from './sportsReducer';

export default combineReducers({
  logins: loginReducer,
  workouts: workoutReducer,
  sports: sportsReducer
});
