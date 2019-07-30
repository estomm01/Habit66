import React, { Component } from "react";
import API from '../utils/API';
import { Button, Card, Icon, Modal, Confirm, Transition, Form } from 'semantic-ui-react'
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
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Charts from "../components/Charts";
import deleteImg from '../assets/images/delete.svg'
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
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


    loadHabits = (id) => {
        API.getHabits(id)

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

      handleDayChange = (selectedDay, modifiers, dayPickerInput, habitId, completedDays, id) => {
        const input = dayPickerInput.getInput();
        console.log(input.value)
        console.log(selectedDay)
        console.log(this.state.selectedDay)
        console.log(`in handleCancel -- habitId ${id}`)
        API.updateHabit(id,  {
          completedDays: this.state.selectedDay,
        })
          .then(res => this.loadHabits())
          .catch(err => console.log(err));

        console.log(input.value)
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

      updateHabit = id => {
        console.log(this.state.newHabitDate)
        API.updateHabit(id, {
          completedDays: this.state.newHabitDate,
        })
          .then(res => this.loadHabits())
          .catch(err => console.log(err));
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

      const { open, closeOnEscape, closeOnDimmerClick, result, dateOpen, animation, duration, visible,  selectedDay, isDisabled, isEmpty } = this.state
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

            {this.state.habits.length ? (
                // console.log(this.state.allhabits.length)

                <div id="main-div">
                {this.state.habits.map(habit => (

                        <Card key={habit._id} className="ml-auto mr-auto mt-5 mb-5">
                        <Card.Content header={habit.name} />
                        {/* <Card.Content header={habit.oktaId} /> */}
                        {/* <Card.Content header={habit._id} /> */}
                        {/* <Card.Content header={this.id} /> */}
                        <Card.Content description={habit.description} />

                        <Card.Content>
                        <p>
                            {isEmpty && 'Please type or pick a day'}
                            {!isEmpty && !selectedDay && 'This day is invalid'}
                            {selectedDay && isDisabled && 'This day is disabled'}
                            {selectedDay &&
                              !isDisabled &&
                              `You chose ${selectedDay.toLocaleDateString()}`}
                        </p>
                        <DayPickerInput
                          habitId={habit._id}
                          name='selectedDay'
                          value={this.state.selectedDay}
                          onDayChange={this.handleDayChange}
                          // obDayClick={() =>
                          //   this.updateHabit(habit._id)
                          // }
                          onChange={this.handleInputChange}
                          // onClick={() =>
                          //   this.updateHabit(habit._id)
                          // }
                          dayPickerProps={{
                            selectedDays: this.state.selectedDay,
                            disabledDays: {
                              daysOfWeek: [2019, 7, 30,  6],
                            },
                          }}
                          modifiers={modifiers}
                          modifiersStyles={modifiersStyles}
                        />
                        </Card.Content>
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

                        <Transition
                        animation={animation}
                        duration={duration}
                        visible={visible}
                        >
                        <Confirm
                          open={dateOpen}
                          onCancel={() => this.handleCancel(habit._id)}
                          onConfirm={this.handleConfirm}
                        //   onConfirm={() => this.handleConfirm(habit._id)}
                          header="Complete habit for today"
                          content={this.date}
                        />
                      </Transition>
                        <Card.Content extra>
                        <Icon name='user' />
                            { habit.duration }

                        <ProgressBar animated now={habit.progress} />

                        </Card.Content>

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




                      <Button circular positive icon='check' onClick={() => this.completeHabit(habit._id)} />
                      {/* <Button circular negative icon='delete' onClick={() => this.deleteHabit(habit._id)} /> */}
                      </Card>

                ))}
                {/* <Calendar /> */}
                </div>

            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
            <div>
               <Charts
                habits = { this.state.habits }
              />
            </div>
            </>
        )
    }
}

export default HabitsList;
