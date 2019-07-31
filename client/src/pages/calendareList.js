import React, { Component } from "react";
import API from '../utils/API';
import { Button, Card, Icon, Modal, Confirm, Transition, Form } from 'semantic-ui-react'
import { ParallaxProvider } from 'react-scroll-parallax';
import { Link } from "react-router-dom";
import { ProgressBar } from 'react-bootstrap';
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Charts from "../components/Charts";
import deleteImg from '../assets/images/delete.svg'
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import axios from 'axios'
const transitions = ['shake']
const options = transitions.map(name => ({ key: name, text: name, value: name }))

function prepare_habit(user_habits){

  var tmp_habits = [];
  user_habits.map(function(habit){
    tmp_habits[habit._id] = [];
    tmp_habits[habit._id]['name'] = habit.name;
    tmp_habits[habit._id]['description'] = habit.description;
    tmp_habits[habit._id]['duration'] = habit.duration;
    tmp_habits[habit._id]['oktaId'] = habit.oktaId;
    tmp_habits[habit._id]['lastCompletedDay'] = habit.lastCompletedDay;

  });
 return tmp_habits;

}

class CalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      dayStreak: [],
    }
  }
  //this.habitId
  componentDidMount() {
    this.loadHabits();

  }
//   loadHabits = async () => {
//     let data
//     axios.get("/api/habits/oktaId/" + '00ur17ks1KV43LAKV356').then(function(res){
//       return data = res.data
//     });

//     await data

//     this.setState({ habits: prepare_habit(data) })
//     // const result = API.getHabitsByOktaId('00ur17ks1KV43LAKV356')
//     // console.log(result)
//     // this.setState({ habits: prepare_habit(result) })
//     //   // .then(res =>
//     //   //   this.setState({ habits: prepare_habit(res.data) })
//     //   // )
//     //   // .catch(err => console.log(err));
// };

loadHabits = async () => {
  let res = await axios.get("/api/habits/oktaId/" + '00ur17ks1KV43LAKV356');
  let { data } = res;
  // const habits = prepare_habit(data)
  this.setState({ habits: data });
};


render() {
  return (
      <>
      <div id="main-div">
        <h1 className="text-center text-light">My Habits List</h1>
        {console.log("RENDER")}
        {console.log(this.state.habits)}
        {console.log(this.state.habits.length)}
        {this.state.habits.length ? (

                <div id="main-div">
                {this.state.habits.map(habit => (

                        <Card key={habit._id} className="ml-auto mr-auto mt-5 mb-5">
                        <Card.Content header={habit.name} />
                        {/* <Card.Content header={habit.oktaId} /> */}
                        {/* <Card.Content header={habit._id} /> */}
                        {/* <Card.Content header={this.id} /> */}
                        <Card.Content description={habit.description} />
                        <Button circular negative icon='delete' onClick={() => this.deleteHabit(habit._id)} />




                      <Button circular positive icon='check' onClick={() => this.completeHabit(habit._id)} />
                      {/* <Button circular negative icon='delete' onClick={() => this.deleteHabit(habit._id)} /> */}
                      </Card>

                ))}

                  </div>

            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
            {/* <div>
               <Charts
                habits = { this.state.habits }
              />
            </div> */}

      </>
  )
}


}




export default CalendarList;
