import React, { Component } from "react";
import API from '../utils/API';
import { Button, Card, Icon, Modal, Confirm, Transition, Form, CardContent, List } from 'semantic-ui-react'
// Import react-circular-progressbar module and styles
// import Calendar from 'react-calendar';
// import styles from './HabitsList.module.css';
// import {Animated} from "react-animated-css";
// import HabitPage from '../HabitPage/HabitPage';
// import SuccessInfo from '../SuccessInfo/SuccessInfo';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Link } from "react-router-dom";
import { ProgressBar } from 'react-bootstrap';
// import Modal from './Modals/Modal.js';
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Charts from "../components/Charts";
import deleteImg from '../assets/images/delete.svg'
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const transitions = ['shake']

class HabitsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dateOpen: false,
            result: [],
            habits: [],
            habitCounter: 0,
            date: new Date(),
            arrDates: [],
            oktaId: [],
            habitId: [],
            animation: transitions[0],
            duration: 500,
            visible: true,
            completedDays: [],
            selectedDay: '',
            isEmpty: true,
            isDisabled: false,
            newHabitDate: '',
            dayStreak: '',
        }
       this.idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
       this.id = this.idToken.idToken.claims.sub
      //  this.id = (`${JSON.stringify(this.idToken.idToken.claims.sub)}`)
       this.oktaId = this.state.oktaId
       this.habitId = this.state.id
    }

    componentDidMount() {
        // console.log("hello");

         // var data = API.findHabits(idToken)
        // console.log(this.id);
        // console.log(this.state)
        // console.log(this.state.habits)
        // this.fetchData(this.id);
        this.loadHabits();
        // console.log(this.state)
    }

    // clearHabits = () => this.setState({ habits: res.data, name: "", description: "", duration: "", completedDays:"" });

    loadHabits = () => {
        API.getHabits(this.habitId)

          .then(res =>
            this.setState({ habits: res.data, name: "", description: "", duration: "", completedDays:"" })
          )
          .catch(err => console.log(err));
    };

    deleteHabit = id => {
        API.deleteHabit(id)
          .then(res => this.loadHabits())
          .catch(err => console.log(err));
          window.location.href= "/habitslist"
    };

    completeHabit = id => {
      console.log(`complete habit for ${id}`);
    }



      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
      }




      close = () => this.setState({ open: false })

      show = () => this.setState({ dateOpen: true })
      handleConfirm = (day, { selected }, modifiers = {}) => {
          this.handleDayClick(day, { selected }, modifiers = {})
          this.setState({
            result: 'Completed',
            dateOpen: false,
            })
      }

      handleCancel = (habitId) => {
          alert(`in handleCancel -- habitId ${habitId}`);
          this.setState({ result: 'Skipped', dateOpen: false, habitId })
      }

      state = { animation: transitions[0], duration: 500, visible: true }
      handleChange = (e, { name, value }) => this.setState({ [name]: value })
      toggleVisibility = () => this.setState(prevState => ({ visible: !prevState.visible }))

      handleDayChange = (habit) => {
        console.log(habit)
        // const input = dayPickerInput.getInput();
        // console.log(input.value)
        // console.log(selectedDay)
        // console.log(this.state.selectedDay)
        console.log(`in handleDayChange -- habitId ${habit._id}`)
        API.updateHabit(habit._id,  {
          completedDays: this.state.selectedDay,
          dayStreak: this.state.selectedDay
        })
          .then(res => this.loadHabits())
          .catch(err => console.log(err));


        // console.log(input.value)
        console.log(this.state.selectedDay)
        // this.setState({
        //   completedDays: input.value.trim()
        // })
        // console.log(this.state.selectedDay)
        // this.setState({
        //   selectedDay,
        //   isEmpty: !input.value.trim(),
        //   isDisabled: modifiers.disabled === true,
        // });
        // console.log(this.state.selectedDay)

      }




      updateHabit = (id) => {
        console.log(`in handleDayChange -- habitId ${id}`)
        API.updateHabit(id,  {
          dayStreak: this.state.newHabitDate
        })
          .then(res => this.loadHabits())
          .catch(err => console.log(err));
          window.location.href= "/habitslist"
      };

    // fetchData(id) {
    //     fetch(`api/habits`)
    //         .then(res => res.json())
    //         .then((res) => {

    //             this.setState({ allhabits: res });
    //             console.log(res);
    //             // window.location.href= "/habitslist"
    //         })

    // }

    // deleteHabit = habitId => {
    //     API
    //     .deleteHabit(habitId)
    //     .then(() => {
    //         console.log(habitId);
    //         this.fetchData();
    //     })
    //     .catch(err => console.log(err))

    // }

    render() {
      const { open, closeOnEscape, closeOnDimmerClick, result, dateOpen, animation, duration, visible,  selectedDay, isDisabled, isEmpty, } = this.state
        const today = Date.now();
        const modifiers = {
          thursdays: { daysOfWeek: [4] },
          birthday: new Date(),
        };
        const modifiersStyles = {
          birthday: {
            color: 'white',
            backgroundColor: '#ffc107',
          },
          thursdays: {
            color: '#ffc107',
            backgroundColor: '#fffdee',
          },
          outside: {
            backgroundColor: 'white',
          },
        };
        return (
            <>
            <div id="main-div">
            <h1 className="text-center text-light">My Habits List</h1>
            <p className="text-center">
              {/* Create HABITS,{' '} */}
              <Link to="/habitsPage">Click here to create more HABITS</Link>
            </p>
            {this.state.habits.length ? (
                // console.log(this.state.allhabits.length)

                <div>
                {this.state.habits.map(habit => (

                        <Card key={habit._id} className="ml-auto mr-auto mt-5 mb-5">
                        <Card.Content header={habit.name} />
                        {/* <Card.Content header={habit.oktaId} /> */}
                        {/* <Card.Content header={habit._id} /> */}
                        {/* <Card.Content header={this.id} /> */}
                        <Card.Content description={habit.description} />


                        {/* <p>
                            {isEmpty && 'Please type or pick a day'}
                            {!isEmpty && !selectedDay && 'This day is invalid'}
                            {selectedDay && isDisabled && 'This day is disabled'}
                            {selectedDay &&
                              !isDisabled &&
                              `You chose ${selectedDay.toLocaleDateString()}`}
                        </p> */}
                        {/* <DayPickerInput
                          habitId={habit._id}
                          name='selectedDay'
                          value={this.state.dayStreak}
                          onDayChange={() => this.handleDayChange(habit)}
                          obDayClick={() =>
                            this.updateHabit(habit._id)
                          }
                          onChange={this.handleInputChange}
                          onClick={() =>
                            this.updateHabit(habit._id)
                          }
                          dayPickerProps={{
                            selectedDays: this.state.selectedDay,
                            disabledDays: {
                              daysOfWeek: [2019, 7, 30,  6],
                            },
                          }}
                          modifiers={modifiers}
                          modifiersStyles={modifiersStyles}
                        /> */}

                        {/* <DayPicker
                        key={habit._id}
                        selectedDays={this.state.selectedDay}
                        disabledDays={this.state.selectedDay}
                        disabledDays={new Date()}
                        modifiers={{
                          sunday: day => day.getDay() === 0,
                          firstOfMonth: day => day.getDate() === 1
                        }}
                        onDayClick={this.handleDayClick}
                        onDayMouseEnter={this.handleDayMouseEnter}
                        /> */}
                        {/* <Card.Content extra>
                          {this.state.selectedDay
                            ? this.state.selectedDay.toLocaleDateString()
                            : 'Please select a day ✔'}
                        </Card.Content> */}
                        {/* <Button
                          onClick={() =>
                            this.updateHabit(habit._id)
                          }
                          circular
                          positive
                          labelPosition="right"
                          icon="checkmark"
                          content="Yes"
                        /> */}
                        <Card.Content>
                          <p>Select a Date</p>
                          <Form>
                            <Form.Field>
                              <input
                              type="date"
                              id="habits-dates"
                              name="newHabitDate"
                              value={this.state.newHabitDate}
                              onChange={this.handleInputChange}
                              />
                            </Form.Field>
                          </Form>

                            <Button
                              onClick={() =>
                                this.updateHabit(habit._id)
                              }
                              circular
                              positive
                              className="mt-3"
                              icon="checkmark"
                            />
                        </Card.Content>


                        <Transition
                        animation={animation}
                        duration={duration}
                        visible={visible}
                        >
                        <Confirm
                          open={dateOpen}
                          onCancel={(id) => this.handleCancel(habit._id)}
                          onConfirm={this.handleConfirm}
                        //   onConfirm={() => this.handleConfirm(habit._id)}
                          header="Complete habit for today"
                          content={this.date}
                        />
                      </Transition>
                        <Card.Content extra>
                        <Icon name='certificate' />
                        <p>Habit Duration</p>
                        { habit.duration }
                        <CardContent>
                        <Icon name="chart line" />
                        <p>Number of completed Days</p>
                        </CardContent>
                        { habit.dayStreak.length }
                        {/* <ProgressBar animated now={habit.dayStreak.length} /> */}


                        <CircularProgressbar
                        value={habit.dayStreak.length}
                        background
                        styles={buildStyles({
                          backgroundColor: "#ff6768",
                          textColor: "red",
                          pathColor: "#17223b",
                          trailColor: "#bdc3c7",
                          path: {

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            // Customize transition animation
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            // Rotate the path
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                          },
                          trail: {
                            // Trail color
                            stroke: '#d6d6d6',
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            // Rotate the trail
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                          },
                        })}
                        />;
                        </Card.Content>
                        <CardContent>
                        {/* {habit.dayStreak} */}
                          <List key={habit._id}>

                            {habit.dayStreak.map(date => <List.Item>{(date).slice(0, 10)}</List.Item>)}

                          </List>
                        </CardContent>

                        <Button
                        negative
                        icon="delete"
                        onClick={this.closeConfigShow(false, true)}
                      />
                      <Transition
                        animation={animation}
                        duration={duration}
                        visible={visible}
                      >
                        <Modal
                          size="tiny"
                          open={open}
                          closeOnEscape={closeOnEscape}
                          closeOnDimmerClick={closeOnDimmerClick}
                          onClose={this.close}
                        >
                          <Modal.Header>Delete Habit</Modal.Header>
                          <Modal.Content>
                            <p>
                              Are you sure you want to delete your Habit
                            </p>
                            <img
                              src={deleteImg}
                              className="img-fluid"
                            />
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              circular
                              onClick={this.close}
                              negative
                            >
                              No
                            </Button>
                            <Button
                              onClick={() =>
                                this.deleteHabit(habit._id)
                              }
                              circular
                              positive
                              labelPosition="right"
                              icon="checkmark"
                              content="Yes"
                            />
                          </Modal.Actions>
                        </Modal>
                      </Transition>
                      {/* <Button circular negative icon='delete' onClick={() => this.deleteHabit(habit._id)} /> */}




                      {/* <Button circular positive icon='check' onClick={() => this.completeHabit(habit._id)} /> */}
                      {/* <Button circular negative icon='delete' onClick={() => this.deleteHabit(habit._id)} /> */}
                      </Card>

                ))}
                {/* <Calendar /> */}
                </div>


            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
            <div className="m-5">
               <Charts
                habits = { this.state.habits }
              />
            </div>
            </>
        )
    }
}

export default HabitsList;
