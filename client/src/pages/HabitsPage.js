import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import { Button } from 'semantic-ui-react'
import HabitsImg from "../assets/images/habits.svg"
import "../App.css"
import axios from 'axios';

import API from '../utils/API';
class Habits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      currentUserName: '',
      currentUserEmail: '',
      currentUserSub: '',
      newHabitName: '',
      newHabitDuration: '',
      newHabitDescription: '',
      userHabits: []
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name,
      currentUserSub: idToken.idToken.claims.sub
    }, () => {
      axios.get(`http://localhost:3002/api/habits/${this.state.currentUserSub}`)
        .then(
          (res) => this.displayUserHabits(res)
          // (res) => console.log(`HabitPage response: ${JSON.stringify(res, null, 4)}`)
          // function(res){
          //   console.log(`HabitPage response: ${JSON.stringify(res)}`);
          //   this.setState({ userHabits: res.data })
          //   console.log(this.state.userHabits)
          // }
        )


        // .then((res) => console.log(`HabitPage response: ${JSON.stringify(res, null, 4)}`))
    })
  }

  displayUserHabits(res) {
    this.setState({ userHabits: res.data })
    console.log(`After setState: ${JSON.stringify(this.state.userHabits)}`)
  }

  formChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  createHabit() {
    const newHabit = {
      name: this.state.newHabitName,
      description: this.state.newHabitDescription,
      duration: this.state.newHabitDuration
    }

    console.log(`New habit: ${newHabit} being sent to api...`)
    window.location.href="/habitslist"

    // console.log(`New habit: ${newHabit} being sent to api...`)

    API.saveHabit(newHabit, this.state.currentUserSub);
  }


  render() {
    const { currentUserEmail, currentUserName } = this.state;
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

    return (
      <>
      <div className="text-light" id="main-div">
      <div className="text-center">
        <h1>Welcome {currentUserName}</h1>
        {/* <p>Email: {currentUserEmail}</p>
        <p>Welcome to habit21, let build good habits.</p> */}
      </div>

      <div className="text-center">
        <Button circular icon='plus' className="p-4 bg-danger mt-4 glowing" bg="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <img src={ HabitsImg } alt="Habits Imange" className="img-fluid"></img>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Add Habits</ModalHeader>
          <ModalBody>
          “A habit (or won’t) is a routine or behavior that is repeated regularly and tends to occur unconsciously.”
          The process of changing a habit into a new behavior is called habit formation.
          t’s very hard to break old habits and form new habits since our behavior is engrained into our neural pathways.
          But repetition is the key to changing a habit.

          <FormGroup className={this.props.className}>{' '}
            <Label for="unmountOnClose">Habit</Label>
            <Input
              type="text"
              id="habits-title"
              placeholder="Wake up everyday at 5 AM"
              name="newHabitName"
              value={this.state.newHabitName}
              onChange={this.formChange}
            />

            <Label for="unmountOnClose">How many days you want to work on your habit?n</Label>
            <Label for="unmountOnClose">Duration</Label>

            <Input
              type="text"
              id="habits-duration"
              placeholder="66"
              name="newHabitDuration"
              value={this.state.newHabitDuration}
              onChange={this.formChange}
            />
            <Label for="unmountOnClose">Description</Label>
            <Input
              type="textarea"
              id="habits-description"
              placeholder="Write something (data should remain in modal if unmountOnClose is set to false)"
              rows={5}
              name="newHabitDescription"
              value={this.state.newHabitDescription}
              onChange={this.formChange}
            />
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="bg-primary text-light"  onClick={this.createHabit.bind(this)}>Create Habit</Button>{' '}
            <Button className="bg-danger text-light" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

      <div>
        {this.state.userHabits.map((habit) => (
        <>
        <h2>{habit.name}</h2>
        <p>{habit.description}</p>
        <p><strong>Duration: </strong>{habit.duration}</p>
        <p><strong>Progress: </strong>{habit.progress}%</p>
        </>
        ))}

      </div>
    </div>
      </>
    );
  }
}


export default Habits;
