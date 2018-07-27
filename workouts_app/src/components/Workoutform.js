//react basis
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//Router
import { withRouter, Link } from 'react-router-dom';
//Component
import { createWorkout, fetchSports } from '../actions/workoutActions';

var array = new Array();

class Workoutform extends Component {

  constructor(props){
    super(props);
    this.state = {
      dateTime: '',
      name: '',
      max: '',
      min: '',
      minutes: '',
      caloriesOut: '',
      sportartensIds: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    console.log('componentWillMount fetchSports Workoutform');
    this.props.fetchSports();
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    var array2 = new Array();
    var x = 0;
    array = document.form.elements.sport;
    for (var i = 0; i < array.length; i++) {
      if (array[i].checked){
        var j = array[i].value ;

        array2[x] = j ;
        x++;
        console.log("j: "+j);
      }
    }
    console.log("array: "+array2);

    var ma = parseInt(this.state.max);
    var mi = parseInt(this.state.min);
    var minu = parseInt(this.state.minutes);
    var calories = parseInt(this.state.caloriesOut);

    const workout = {
      dateTime: this.state.dateTime,
      name: this.state.name,
      max: ma,
      min: mi,
      minutes: minu,
      caloriesOut: calories,
      sportartensIds: array2
    };

    this.props.createWorkout(workout);
    this.props.history.push("/home");
  }

  render(){

    const sportItems = this.props.sports.map(sportart => (
      <label className="checkbox">
        <input type="checkbox" name="sport" value={sportart.id} />
        { sportart.name }
      </label>
    ));

    return(
      <div>
      <div class="card text-center" data-tabs="myTabPage">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item"><Link class="nav-link" to={"/home"} data-tab-page="page1">Workouts</Link></li>
      <li class="nav-item"><Link class="nav-link tabbackground" to={"/workoutform"} data-tab-page="page2">Add Workout</Link></li>
      <li class="nav-item"><Link class="nav-link" to={"/sports"} data-tab-page="page3">List Workout by category</Link></li>
    </ul>
  </div>
  <div class="card-block" data-tab-page="page2">
  <br />
    <h4 class="card-title">Workout manuell eintragen</h4>
    <form name="form" onSubmit={this.onSubmit}>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
              <div className="formularfeld">
                <br />
                <input type="text" name="dateTime" onChange={this.onChange} value={this.state.dateTime} placeholder="Datum" />
              </div>
              <div className="formularfeld">
                <br />
                <input type="text" name="name" onChange={this.onChange} value={this.state.name} placeholder="Name" />
              </div>
              <div className="formularfeld">
                <br />
                <input type="number" name="max" onChange={this.onChange} value={this.state.max} placeholder="Maximaler Puls" />
              </div>
              <div className="formularfeld">
                <br />
                <input type="number" name="min" onChange={this.onChange} value={this.state.min} placeholder="Minimaler Puls" />
              </div>
              <div className="formularfeld">
                <br />
                <input type="number" name="minutes" onChange={this.onChange} value={this.state.minutes} placeholder="Zeit"/>
              </div>
              <div className="formularfeld">
              <br />
                <input type="number" name="caloriesOut" onChange={this.onChange} value={this.state.caloriesOut} placeholder="Verbrannte Kalorien" />
              </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 check">
            <div class="check">
              { sportItems }
                </div>
              <button type="submit" className="eintragen"><Link to={"/home"}>Eintragen</Link></button>
          </div>
      </div>
    </form>
  </div>

</div>

      </div>
    )
  }
}

Workoutform.propTypes = {
  fetchSports: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sports: state.sports.items, //index.js (2.workouts)
})

export default withRouter(connect(mapStateToProps, { fetchSports, createWorkout })(Workoutform));
