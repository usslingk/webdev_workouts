import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import workoutReducer from './workoutReducer';

export default combineReducers({
  logins: loginReducer,
  workouts: workoutReducer
});
