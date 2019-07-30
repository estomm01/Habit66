import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Header, Icon, Image, Modal, Form, Transition } from 'semantic-ui-react'
// import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
// import { Button } from 'semantic-ui-react'
//import axios from 'axios';
import API from '../utils/API';
import "../App.css"
import HabitsImg from "../assets/images/habits.svg"
import ChecklistImg from "../assets/images/checklist.svg"
import Quote, { getRandomQuote } from 'inspirational-quotes';
const transitions = ['tada']
const options = transitions.map(name => ({ key: name, text: name, value: name }))

class Habits extends Component {

  state = {
    currentUserName: '',
    currentUserEmail: '',
    currentUserSub: '',
    newHabitName: '',
    newHabitDuration: '',
    newHabitDescription: '',
    userHabits: [],
    animation: transitions[0],
    duration: 1500,
    visible: true,
    getRandomQuote: getRandomQuote()
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     modal: false,
  //     currentUserName: '',
  //     currentUserEmail: '',
  //     currentUserSub: '',
  //     newHabitName: '',
  //     newHabitDuration: '',
  //     newHabitDescription: '',
  //     userHabits: []
  //   };
  //   this.toggle = this.toggle.bind(this);
  // }
  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name,
      currentUserSub: idToken.idToken.claims.sub
    });
  }

  loadHabits = () => {
    API.getHabits()
      .then(res =>
        this.setState({ habits: res.data, name: "", description: "", duration: "" })
      )
      .catch(err => console.log(err));
  };

  deleteHabit = id => {
    API.deleteHabit(id)
      .then(res => this.loadHabits())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.newHabitName && this.state.newHabitDuration) {
      API.saveHabit({
        name: this.state.newHabitName,
        description: this.state.newHabitDescription,
        oktaId: this.state.currentUserSub,
        duration: this.state.newHabitDuration
      })
        .then(res => this.loadHabits())
        .catch(err => console.log(err));
    }
    window.location.href="/habitslist"
  };


  // componentDidMount() {
  //   const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
  //   this.setState({
  //     currentUserEmail: idToken.idToken.claims.email,
  //     currentUserName: idToken.idToken.claims.name,
  //     currentUserSub: idToken.idToken.claims.sub
  //   }, () => {
  //     axios.get(`http://localhost:3001/api/habits/${this.state.currentUserSub}`)
  //       .then(
  //         (res) => this.displayUserHabits(res)
  //       )
  //   })
  // }

  // displayUserHabits(res) {
  //   this.setState({ userHabits: res.data })
  //   console.log(`After setState: ${JSON.stringify(this.state.userHabits)}`)
  // }

  // formChange = e => {
	// 	this.setState({
	// 		[e.target.name]: e.target.value
	// 	});
	// };

  // toggle() {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  // }

  // createHabit() {
  //   const newHabit = {
  //     name: this.state.newHabitName,
  //     description: this.state.newHabitDescription,
  //     duration: this.state.newHabitDuration
  //   }

  //   console.log(`New habit: ${newHabit} being sent to api...`)
  //   window.location.href="/habitslist"


  //   API.saveHabit(newHabit, this.state.currentUserSub);
  // }


  render() {
    const { currentUserEmail, currentUserName, animation, duration, visible, getRandomQuote } = this.state;
    //const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

    return (
      <>
      <div className="text-light" id="main-div">
      <div className="text-center">

        <h1>Welcome {currentUserName}</h1>
         <h3>{getRandomQuote}</h3>
        {/* <p>Email: {currentUserEmail}</p>
        <p>Welcome to habit21, let build good habits.</p> */}
      </div>

      <div className="text-center">
      <img src={ HabitsImg } alt="Habits Imange" className="img-fluid"></img>
      <Transition animation={animation} duration={duration} visible={visible}>
        <Modal trigger={<Button circular icon='plus' className="p-4 bg-danger mt-4 glowing" bg="danger"></Button>}>
        <Modal.Header>Add Habits</Modal.Header>

        <Modal.Content image scrolling>
          <Image  src= { ChecklistImg } width= { 400 } height= { 1200 } wrapped />

          <Modal.Description>
            <Header>What is Habits?</Header>
            <p>“A habit is a routine or behavior that is repeated regularly and tends to occur unconsciously.”</p>
            <p>The process of changing a habit into a new behavior is called habit formation.</p>
            <p>t’s very hard to break old habits and form new habits since our behavior is engrained into our neutral pathways.</p>
            <p>But repetition is the key to changing a habit.</p>

            <Form>
              <Form.Field>
                <label>Habit Title</label>
                <input

                id="habits-title"
                name="newHabitName"
                value={this.state.newHabitName}
                placeholder='Habit Title'
                onChange={this.handleInputChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Duration</label>
                <input

                id="habits-duration"
                name="newHabitDuration"
                value={this.state.newHabitDuration}
                placeholder="66"
                onChange={this.handleInputChange}
                />
              </Form.Field>

              <Form.TextArea
                label='Description'
                id="habits-description"
                name="newHabitDescription"
                value={this.state.newHabitDescription}
                placeholder='Description (optional)...'
                onChange={this.handleInputChange}
              />
            </Form>

            {/* {_.times(8, i => (
              <Image key={i} src='/images/wireframe/paragraph.png' style={{ paddingBottom: 5 }} />
            ))} */}
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions className="p-5">
          <Button
            circular
            positive
            disabled={!(this.state.newHabitName && this.state.newHabitDuration)}
            onClick={this.handleFormSubmit}>
            Add <Icon name='chevron right' />
          </Button>{' '}
        </Modal.Actions>

        </Modal>
        </Transition>
      </div>

      {/* <div className="text-center">
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
      </div> */}

      {/* <div>
        {this.state.userHabits.map((habit) => (
        <>
        <h2>{habit.name}</h2>
        <p>{habit.description}</p>
        <p><strong>Duration: </strong>{habit.duration}</p>
        <p><strong>Progress: </strong>{habit.progress}%</p>
        </>
        ))}

      </div> */}
    </div>
      </>
    );
  }
}


export default Habits;
