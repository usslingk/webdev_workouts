//react basis
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter } from 'react-router-dom';
//Component
import { updateWorkout, getWorkout } from '../actions/workoutActions';


class UpdateWorkout extends Component {

  constructor(props){
    super(props);
    this.state = {
      dateTime: '',
      name: '',
      max: '',
      min: '',
      minutes: '',
      caloriesOut: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    let id = this.props.match.params.workoutid
    console.log(id);
    this.props.getWorkout(id);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.singleWorkout){
      this.setState(nextProps.singleWorkout)
      console.log("..willRecieveProps state: ",this.state)
      console.log("..willRecieveProps nextProps.singlePost: ",nextProps.singleWorkout)
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    var ma = parseInt(this.state.max);
    var mi = parseInt(this.state.min);
    var minu = parseInt(this.state.minutes);
    var calories = parseInt(this.state.caloriesOut);

    const workout = {
      id: this.state.id,
      dateTime: this.state.dateTime,
      name: this.state.name,
      max: ma,
      min: mi,
      minutes: minu,
      caloriesOut: calories,
    };
    this.props.updateWorkout(workout);
    this.props.history.push("/home");
    window.location.reload();
  }

  render(){
    return(
      <div className="App">
        <h3>Workout bearbeiten</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>ID: </label><br />
            <input type="text" name="id"  value={this.state.id} readOnly />
          </div>
          <div>
            <label>Datum:</label><br />
            <input type="text" name="dateTime" onChange={this.onChange} value={this.state.dateTime} />
          </div>
          <div>
            <label>Name:</label><br />
            <input type="text" name="name" onChange={this.onChange} value={this.state.name} />
          </div>
          <div>
            <label>Maximaler Puls:</label><br />
            <input type="number" name="max" onChange={this.onChange} value={this.state.max} />
          </div>
          <div>
            <label>Minimaler Puls:</label><br />
            <input type="number" name="min" onChange={this.onChange} value={this.state.min} />
          </div>
          <div>
            <label>Zeit:</label><br />
            <input type="number" name="minutes" onChange={this.onChange} value={this.state.minutes} />
          </div>
          <div>
            <label>Verbrannte Kalorien:</label><br />
            <input type="number" name="caloriesOut" onChange={this.onChange} value={this.state.caloriesOut} />
          </div>
          <br />
          <button type="submit" className="loginbtn">Eintragen</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  console.log("in mapStateToProps: ", reduxState.workouts.item)
  return ({
    // workouts ist der Reducer!
    // reduxState der Parameter der Arrow-Function
    singleWorkout: reduxState.workouts.item
  })
}

export default withRouter( connect (mapStateToProps, { getWorkout, updateWorkout })(UpdateWorkout));
